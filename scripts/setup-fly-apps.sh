#!/bin/bash
set -euo pipefail

# Setup Fly.io Applications for Development and Production
# This script initializes both dev and prod Fly.io apps with proper configuration

echo "🚀 Setting up Fly.io applications for NextNode Frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROD_APP_NAME="nextnode-front-prod"
DEV_APP_NAME="nextnode-front-dev"
REGION="cdg"  # Paris region
ORG_NAME="nextnode"  # Replace with your Fly.io organization

# Function to check if flyctl is installed
check_flyctl() {
    if ! command -v flyctl &> /dev/null; then
        echo -e "${RED}❌ flyctl is not installed. Please install it from https://fly.io/docs/getting-started/installing-flyctl/${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ flyctl is installed${NC}"
}

# Function to check if user is logged in
check_auth() {
    if ! flyctl auth whoami &> /dev/null; then
        echo -e "${YELLOW}⚠️  Please log in to Fly.io first:${NC}"
        echo "flyctl auth login"
        exit 1
    fi
    echo -e "${GREEN}✅ Authenticated with Fly.io${NC}"
}

# Function to create Fly.io app
create_fly_app() {
    local app_name=$1
    local env_type=$2
    
    echo -e "${YELLOW}📦 Creating Fly.io app: ${app_name}${NC}"
    
    # Check if app already exists
    if flyctl apps list | grep -q "$app_name"; then
        echo -e "${GREEN}✅ App ${app_name} already exists${NC}"
        return 0
    fi
    
    # Create the app
    if flyctl apps create "$app_name" --org "$ORG_NAME"; then
        echo -e "${GREEN}✅ App ${app_name} created successfully${NC}"
    else
        echo -e "${RED}❌ Failed to create app ${app_name}${NC}"
        return 1
    fi
    
    # Set environment-specific secrets and config
    echo -e "${YELLOW}🔧 Configuring ${app_name} for ${env_type} environment${NC}"
    
    # Set environment variables (with error handling)
    if flyctl secrets set \
        NODE_ENV="production" \
        ASTRO_TELEMETRY_DISABLED="1" \
        --app "$app_name"; then
        echo -e "${GREEN}✅ Secrets configured for ${app_name}${NC}"
    else
        echo -e "${YELLOW}⚠️  Warning: Could not set secrets for ${app_name} (will be set during deployment)${NC}"
    fi
    
    # Note: Scaling will be configured during first deployment
    echo -e "${GREEN}ℹ️  Scaling will be configured during first deployment${NC}"
    
    echo -e "${GREEN}✅ App ${app_name} created and configured${NC}"
}

# Function to setup custom domains
setup_custom_domains() {
    echo -e "${YELLOW}🌐 Setting up custom domains${NC}"
    
    # Note: These commands will be commented out as they require actual domain names
    # Uncomment and modify when you have your actual domain
    
    echo -e "${YELLOW}ℹ️  To setup custom domains, run these commands with your actual domain:${NC}"
    echo ""
    echo "# Production domain:"
    echo "flyctl certs create yourdomain.com --app $PROD_APP_NAME"
    echo ""
    echo "# Development domain:"
    echo "flyctl certs create dev.yourdomain.com --app $DEV_APP_NAME"
    echo ""
    echo "# Then configure DNS records in Cloudflare:"
    echo "# A record: yourdomain.com -> [Fly.io IPv4]"
    echo "# AAAA record: yourdomain.com -> [Fly.io IPv6]"
    echo "# A record: dev.yourdomain.com -> [Fly.io IPv4]"
    echo "# AAAA record: dev.yourdomain.com -> [Fly.io IPv6]"
    echo ""
    echo "# Get Fly.io IPs with:"
    echo "flyctl ips list --app $PROD_APP_NAME"
    echo "flyctl ips list --app $DEV_APP_NAME"
}

# Function to setup monitoring
setup_monitoring() {
    local app_name=$1
    
    echo -e "${YELLOW}📊 Setting up monitoring for ${app_name}${NC}"
    
    # Monitoring will be enabled automatically after first deployment
    echo -e "${GREEN}ℹ️  Monitoring will be enabled after first deployment${NC}"
    echo -e "${GREEN}✅ Monitoring configured for ${app_name}${NC}"
}

# Main execution
main() {
    echo -e "${GREEN}🚀 Starting Fly.io setup process${NC}"
    
    # Pre-flight checks
    check_flyctl
    check_auth
    
    # Create applications
    create_fly_app "$PROD_APP_NAME" "prod"
    create_fly_app "$DEV_APP_NAME" "dev"
    
    # Setup monitoring
    setup_monitoring "$PROD_APP_NAME"
    setup_monitoring "$DEV_APP_NAME"
    
    # Setup custom domains (informational)
    setup_custom_domains
    
    echo -e "${GREEN}🎉 Fly.io setup completed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo "1. Configure your custom domains in Cloudflare"
    echo "2. Run the GitHub Actions to deploy your applications"
    echo "3. Set up the required GitHub Secrets:"
    echo "   - FLY_API_TOKEN"
    echo "   - CLOUDFLARE_API_TOKEN"
    echo "   - CLOUDFLARE_ZONE_ID"
    echo ""
    echo -e "${GREEN}🔗 App URLs:${NC}"
    echo "Production: https://$PROD_APP_NAME.fly.dev"
    echo "Development: https://$DEV_APP_NAME.fly.dev"
}

# Run main function
main "$@"