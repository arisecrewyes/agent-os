#!/usr/bin/env python3
"""
Self-hosted lead enrichment - replaces Clearbit/Apollo
No API key needed, no KYC, no rate limits
Uses OSINT techniques to enrich lead data
"""
import argparse
import json
import re
import socket
import ssl
import urllib.request
import urllib.error
from urllib.parse import urlparse

def enrich_email(email):
    """Enrich data from an email address"""
    domain = email.split("@")[1] if "@" in email else None
    result = {"email": email, "domain": domain, "sources": []}
    
    if domain:
        # Get company info from domain
        company_info = get_company_from_domain(domain)
        result.update(company_info)
        
        # Check if domain has website
        try:
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            req = urllib.request.Request(f"https://{domain}", headers={"User-Agent": "Mozilla/5.0"})
            resp = urllib.request.urlopen(req, timeout=5, context=ctx)
            result["website_accessible"] = True
            result["status_code"] = resp.status
        except:
            result["website_accessible"] = False
        
        # MX record check
        try:
            import dns.resolver
            mx = dns.resolver.resolve(domain, 'MX')
            result["mx_records"] = [str(r.exchange) for r in mx]
            result["email_provider"] = "custom" if not any("google" in str(r) or "microsoft" in str(r) or "proton" in str(r) for r in mx) else "major"
        except:
            result["mx_records"] = []
    
    return result

def enrich_domain(domain):
    """Enrich data from a domain"""
    result = {"domain": domain, "sources": []}
    
    # Company info
    company_info = get_company_from_domain(domain)
    result.update(company_info)
    
    # DNS records
    try:
        ip = socket.gethostbyname(domain)
        result["ip_address"] = ip
    except:
        result["ip_address"] = None
    
    # Website check
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        req = urllib.request.Request(f"https://{domain}", headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=5, context=ctx)
        result["website_accessible"] = True
        result["status_code"] = resp.status
        
        # Try to extract title
        content = resp.read().decode("utf-8", errors="ignore")
        title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE | re.DOTALL)
        if title_match:
            result["website_title"] = title_match.group(1).strip()
    except:
        result["website_accessible"] = False
    
    return result

def enrich_company(company):
    """Enrich data from a company name"""
    result = {"company": company, "sources": []}
    
    # Try to find domain from company name
    clean_name = re.sub(r'[^a-zA-Z0-9]', '', company.lower())
    possible_domains = [
        f"{clean_name}.com",
        f"{clean_name}.io",
        f"{clean_name}.co",
        f"{clean_name}inc.com",
        f"{clean_name}hq.com"
    ]
    
    for domain in possible_domains:
        try:
            ip = socket.gethostbyname(domain)
            result["likely_domain"] = domain
            result["ip_address"] = ip
            break
        except:
            continue
    
    return result

def get_company_from_domain(domain):
    """Extract company info from domain"""
    result = {}
    
    # Remove TLD to get company name
    parts = domain.split(".")
    if len(parts) >= 2:
        company_slug = parts[-2]
        result["company_name_guess"] = company_slug.replace("-", " ").replace("_", " ").title()
    
    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Self-hosted lead enrichment")
    parser.add_argument("--email", help="Email to enrich")
    parser.add_argument("--domain", help="Domain to enrich")
    parser.add_argument("--company", help="Company to enrich")
    
    args = parser.parse_args()
    
    if args.email:
        result = enrich_email(args.email)
    elif args.domain:
        result = enrich_domain(args.domain)
    elif args.company:
        result = enrich_company(args.company)
    else:
        result = {"error": "Provide --email, --domain, or --company"}
    
    print(json.dumps(result, indent=2))
