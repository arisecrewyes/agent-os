FROM rust:1.75-slim as builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends git pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/RyanCodrai/turbovec.git /app/source 2>/dev/null || true
COPY . /app/source/ 2>/dev/null || true
WORKDIR /app/source
RUN cargo build --release 2>/dev/null || true
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends libssl3 ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/source/target/release/turbovec /usr/local/bin/ 2>/dev/null || COPY --from=builder /app/source/target/release/ /usr/local/bin/
EXPOSE 8093
CMD ["turbovec"]
