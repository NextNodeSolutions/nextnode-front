# NextNode Frontend - Deployment Guide

Complete guide for deploying the NextNode Frontend application to Fly.io with automated CI/CD.

## 🚀 Quick Start

### Prerequisites

1. **Fly.io CLI** installed: `curl -L https://fly.io/install.sh | sh`
2. **Fly.io Account** and organization
3. **Cloudflare Account** with domain management
4. **GitHub Repository** with Actions enabled

### Initial Setup

```bash
# 1. Login to Fly.io
flyctl auth login

# 2. Run the setup script
./scripts/setup-fly-apps.sh

# 3. Configure GitHub Secrets (see below)

# 4. Push to trigger deployment
git push origin develop  # Deploy to dev environment
git push origin main     # Deploy to production
```

## 🔐 GitHub Secrets Configuration

Add these secrets to your GitHub repository:

### Required Secrets

| Secret Name            | Description          | How to Get                              |
| ---------------------- | -------------------- | --------------------------------------- |
| `FLY_API_TOKEN`        | Fly.io API token     | `flyctl auth token`                     |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token | Cloudflare Dashboard → API Tokens       |
| `CLOUDFLARE_ZONE_ID`   | DNS zone ID          | Cloudflare Dashboard → Domain → Zone ID |

### Getting Cloudflare Tokens

1. **API Token**:
    - Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
    - Click "Create Token"
    - Use "Edit zone DNS" template
    - Select your domain zone
    - Copy the token

2. **Zone ID**:
    - Go to your domain in Cloudflare Dashboard
    - Find "Zone ID" in the right sidebar
    - Copy the ID

## 🌐 Domain Configuration

### 1. Update Configuration Files

Edit the domain names in:

```yaml
# .github/workflows/deploy-dev.yml
env:
  DOMAIN_DEV: dev.yourdomain.com  # Replace with your domain

# .github/workflows/deploy-prod.yml
env:
  DOMAIN_PROD: yourdomain.com     # Replace with your domain
```

### 2. Cloudflare DNS Setup

The GitHub Actions will automatically:

- Create/update A records pointing to Fly.io IPv4
- Create/update AAAA records pointing to Fly.io IPv6
- Enable Cloudflare proxy for CDN and DDoS protection

### 3. SSL Configuration

- Certificates are automatically managed by Fly.io
- Cloudflare SSL/TLS mode should be set to "Full"
- HTTPS redirect is enabled by default

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│  GitHub Actions  │───▶│    Fly.io       │
│                 │    │                  │    │                 │
│ develop branch  │    │ ▶ Tests          │    │ nextnode-dev    │
│ main branch     │    │ ▶ Build Docker   │    │ nextnode-prod   │
└─────────────────┘    │ ▶ Update DNS     │    │                 │
                       │ ▶ Deploy         │    └─────────────────┘
                       └──────────────────┘             │
                                │                       │
                       ┌────────▼──────────┐           │
                       │   Cloudflare      │◀──────────┘
                       │                   │
                       │ ▶ DNS Management  │
                       │ ▶ CDN & Caching   │
                       │ ▶ DDoS Protection │
                       │ ▶ SSL Termination │
                       └───────────────────┘
```

## 🚦 Deployment Workflows

### Development Environment (`develop` branch)

**Trigger**: Push to `develop` branch

**Process**:

1. Run tests (lint, type-check, build)
2. Get Fly.io IP addresses
3. Update Cloudflare DNS records
4. Deploy to `nextnode-front-dev`
5. Setup SSL certificate
6. Health check validation

**URL**: `https://dev.yourdomain.com`

### Production Environment (`main` branch)

**Trigger**: Push to `main` branch

**Process**:

1. Comprehensive testing + security audit
2. Docker security scan
3. Get Fly.io IP addresses
4. Update Cloudflare DNS records
5. Blue-green deployment to `nextnode-front-prod`
6. Setup SSL certificate
7. Multi-stage health checks
8. Automatic rollback on failure
9. Performance validation

**URL**: `https://yourdomain.com`

## 📊 Monitoring & Observability

### Built-in Monitoring

- **Fly.io Metrics**: [fly-metrics.net](https://fly-metrics.net)
- **Health Endpoint**: `/health`
- **Metrics Endpoint**: `/metrics` (Prometheus format)

### Custom Metrics

- Page views by route
- Response time histograms
- Error rates and types
- Memory usage
- Feature usage tracking

### Logging

```bash
# Real-time logs
flyctl logs --app nextnode-front-prod -f

# Development logs
flyctl logs --app nextnode-front-dev -f

# Filtered logs
flyctl logs --app nextnode-front-prod --since 1h | grep ERROR
```

## 🔧 Configuration Management

### Environment Variables

Set via `flyctl secrets`:

```bash
# Production
flyctl secrets set NODE_ENV=production --app nextnode-front-prod
flyctl secrets set SENTRY_DSN=your-sentry-dsn --app nextnode-front-prod

# Development
flyctl secrets set NODE_ENV=production --app nextnode-front-dev
flyctl secrets set DEBUG=true --app nextnode-front-dev
```

### Scaling Configuration

#### Development

- **Instances**: 1 (can scale to 0)
- **Memory**: 256MB
- **CPU**: Shared 1x
- **Auto-stop**: Enabled

#### Production

- **Instances**: 2 minimum
- **Memory**: 512MB
- **CPU**: Shared 1x
- **Auto-stop**: Disabled

```bash
# Scale production
flyctl scale count 3 --app nextnode-front-prod
flyctl scale vm shared-cpu-2x --memory 1024 --app nextnode-front-prod

# Scale development
flyctl scale count 1 --app nextnode-front-dev
flyctl scale vm shared-cpu-1x --memory 256 --app nextnode-front-dev
```

## 🚨 Troubleshooting

### Common Issues

#### 1. DNS Not Updating

```bash
# Check DNS propagation
dig yourdomain.com
nslookup dev.yourdomain.com

# Manually update DNS if needed
flyctl ips list --app nextnode-front-prod
```

#### 2. SSL Certificate Issues

```bash
# Check certificate status
flyctl certs list --app nextnode-front-prod

# Force certificate renewal
flyctl certs create yourdomain.com --app nextnode-front-prod
```

#### 3. Deployment Failures

```bash
# Check deployment status
flyctl status --app nextnode-front-prod

# View recent deployments
flyctl releases --app nextnode-front-prod

# Manual rollback
flyctl releases rollback VERSION --app nextnode-front-prod
```

#### 4. Performance Issues

```bash
# Check resource usage
flyctl status --app nextnode-front-prod

# Scale up if needed
flyctl scale vm shared-cpu-2x --memory 1024 --app nextnode-front-prod

# Check logs for errors
flyctl logs --app nextnode-front-prod | grep -i error
```

### Health Check Debugging

```bash
# Test health endpoint
curl https://yourdomain.com/health

# Test metrics endpoint
curl https://yourdomain.com/metrics

# Test from Fly.io machine
flyctl ssh console --app nextnode-front-prod
curl localhost:4321/health
```

## 🔄 Manual Deployment

If you need to deploy manually:

```bash
# Development
flyctl deploy --config fly.toml --app nextnode-front-dev

# Production
flyctl deploy --config fly.toml --app nextnode-front-prod --strategy bluegreen
```

## 📝 Best Practices

### Security

- ✅ Non-root container execution
- ✅ Minimal base image (Alpine)
- ✅ Secret management via Fly.io secrets
- ✅ Regular security audits in CI/CD
- ✅ HTTPS everywhere with automatic certificates

### Performance

- ✅ Multi-stage Docker builds
- ✅ Layer caching optimization
- ✅ Cloudflare CDN integration
- ✅ Automatic scaling policies
- ✅ Health checks and monitoring

### Reliability

- ✅ Blue-green deployments
- ✅ Automatic rollback on failure
- ✅ Multi-region deployment ready
- ✅ Comprehensive health checks
- ✅ Zero-downtime deployments

### Monitoring

- ✅ Structured logging
- ✅ Custom application metrics
- ✅ Performance monitoring
- ✅ Error tracking and alerting
- ✅ Real-time dashboards

## 🆘 Support

### Resources

- [Fly.io Documentation](https://fly.io/docs/)
- [Cloudflare API Documentation](https://developers.cloudflare.com/api/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Commands Reference

```bash
# Fly.io
flyctl help
flyctl status --app APP_NAME
flyctl logs --app APP_NAME
flyctl ssh console --app APP_NAME

# DNS
dig yourdomain.com
nslookup dev.yourdomain.com

# Docker
docker build -t nextnode-test .
docker run -p 4321:4321 nextnode-test
```

This deployment setup provides a production-ready, automated CI/CD pipeline with comprehensive monitoring and zero-downtime deployments.
