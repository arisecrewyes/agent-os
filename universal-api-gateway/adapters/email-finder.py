#!/usr/bin/env python3
"""
Self-hosted email finder - replaces Hunter.io
No API key needed, no KYC, no rate limits
Uses OSINT techniques to discover email addresses
"""
import argparse
import json
import re
import socket
import sys
import urllib.request
import urllib.error
import ssl

def find_emails(first_name=None, last_name=None, domain=None, username=None):
    """Find email addresses using various OSINT techniques"""
    results = []
    
    # Pattern-based guessing
    if first_name and last_name and domain:
        patterns = [
            f"{first_name.lower()}.{last_name.lower()}@{domain}",
            f"{first_name.lower()[0]}{last_name.lower()}@{domain}",
            f"{first_name.lower()}{last_name.lower()[0]}@{domain}",
            f"{first_name.lower()}_{last_name.lower()}@{domain}",
            f"{first_name.lower()}-{last_name.lower()}@{domain}",
            f"{first_name.lower()}@{domain}",
            f"{last_name.lower()}@{domain}",
            f"{first_name.lower()}{last_name.lower()}@{domain}",
        ]
        for email in patterns:
            results.append({
                "email": email,
                "source": "pattern_guess",
                "confidence": "low",
                "verified": False
            })
    
    if username:
        # Search across common email providers
        providers = ["gmail.com", "outlook.com", "yahoo.com", "protonmail.com", "proton.me"]
        for provider in providers:
            results.append({
                "email": f"{username}@{provider}",
                "source": "username_pattern",
                "confidence": "low",
                "verified": False
            })
    
    # Domain-based search
    if domain:
        # Try common role-based emails
        role_emails = [
            f"info@{domain}", f"contact@{domain}", f"hello@{domain}",
            f"support@{domain}", f"admin@{domain}", f"team@{domain}",
            f"sales@{domain}", f"marketing@{domain}", f"press@{domain}"
        ]
        for email in role_emails:
            results.append({
                "email": email,
                "source": "role_based",
                "confidence": "medium",
                "verified": False
            })
    
    # Deduplicate
    seen = set()
    unique = []
    for r in results:
        if r["email"] not in seen:
            seen.add(r["email"])
            unique.append(r)
    
    return unique

def verify_email(email):
    """Basic email verification via MX record check"""
    domain = email.split("@")[1] if "@" in email else None
    if not domain:
        return False
    try:
        # Check MX records
        import dns.resolver
        mx_records = dns.resolver.resolve(domain, 'MX')
        return len(mx_records) > 0
    except:
        # Fallback: try to resolve the domain
        try:
            socket.gethostbyname(domain)
            return True
        except:
            return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Self-hosted email finder")
    parser.add_argument("--first", help="First name")
    parser.add_argument("--last", help="Last name")
    parser.add_argument("--domain", help="Domain to search")
    parser.add_argument("--username", help="Username to search")
    parser.add_argument("--verify", action="store_true", help="Verify emails via MX lookup")
    
    args = parser.parse_args()
    
    results = find_emails(args.first, args.last, args.domain, args.username)
    
    if args.verify:
        for r in results:
            r["verified"] = verify_email(r["email"])
    
    print(json.dumps(results, indent=2))
