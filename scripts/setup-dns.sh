#!/bin/bash
set -euo pipefail

# Setup DNS Records for NextNode Frontend
# This script configures Cloudflare DNS to point to Fly.io applications

echo "🌐 Setting up DNS records for NextNode Frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="nextnode.fr"
PROD_APP_NAME="nextnode-front-prod"
DEV_APP_NAME="nextnode-front-dev"

# Function to check if GitHub secrets exist (but we can't retrieve values)
check_github_secrets() {
    echo -e "${YELLOW}🔑 Checking GitHub secrets availability...${NC}"
    
    if [[ -z "${GITHUB_TOKEN:-}" ]]; then
        return 1
    fi
    
    local org_name="nextnode"
    local repo_name="nextnode-front"
    
    # Check if secrets exist (we can't get values, only names)
    local secrets_list
    secrets_list=$(gh secret list --repo "$org_name/$repo_name" --json name 2>/dev/null || echo "[]")
    
    local has_cloudflare_token has_cloudflare_zone has_fly_token
    has_cloudflare_token=$(echo "$secrets_list" | jq -r '.[] | select(.name == "CLOUDFLARE_API_TOKEN") | .name' 2>/dev/null)
    has_cloudflare_zone=$(echo "$secrets_list" | jq -r '.[] | select(.name == "CLOUDFLARE_ZONE_ID") | .name' 2>/dev/null)
    has_fly_token=$(echo "$secrets_list" | jq -r '.[] | select(.name == "FLY_API_TOKEN") | .name' 2>/dev/null)
    
    if [[ -n "$has_cloudflare_token" && -n "$has_cloudflare_zone" && -n "$has_fly_token" ]]; then
        echo -e "${GREEN}✅ All required secrets exist in GitHub${NC}"
        echo -e "${BLUE}ℹ️  Note: For security, GitHub doesn't allow reading secret values${NC}"
        echo -e "${YELLOW}⚠️  Please set the environment variables manually this time${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  Some GitHub secrets are missing${NC}"
        return 1
    fi
}

# Check required environment variables
check_env_vars() {
    # Check if GitHub secrets exist (informational only)
    if command -v gh &> /dev/null && [[ -n "${GITHUB_TOKEN:-}" ]]; then
        check_github_secrets
    fi
    
    # Fallback to manual environment variables
    local missing_vars=()
    
    if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
        missing_vars+=("CLOUDFLARE_API_TOKEN")
    fi
    
    if [[ -z "${CLOUDFLARE_ZONE_ID:-}" ]]; then
        missing_vars+=("CLOUDFLARE_ZONE_ID")
    fi
    
    if [[ -z "${FLY_API_TOKEN:-}" ]]; then
        missing_vars+=("FLY_API_TOKEN")
    fi
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        echo -e "${RED}❌ Missing required environment variables:${NC}"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        echo ""
        echo -e "${YELLOW}Please set the required environment variables:${NC}"
        echo "export CLOUDFLARE_API_TOKEN='your_cloudflare_token'"
        echo "export CLOUDFLARE_ZONE_ID='your_zone_id'"
        echo "export FLY_API_TOKEN='your_fly_token'"
        echo ""
        echo -e "${BLUE}To get your Cloudflare Zone ID:${NC}"
        echo "1. Go to https://dash.cloudflare.com"
        echo "2. Select your domain ($DOMAIN)"
        echo "3. Copy the Zone ID from the right sidebar"
        exit 1
    fi
}

# Function to check if required tools are installed
check_dependencies() {
    local missing_tools=()
    
    if ! command -v flyctl &> /dev/null; then
        missing_tools+=("flyctl")
    fi
    
    if ! command -v curl &> /dev/null; then
        missing_tools+=("curl")
    fi
    
    if ! command -v jq &> /dev/null; then
        missing_tools+=("jq")
    fi
    
    # Check for GitHub CLI if GITHUB_TOKEN is available
    if [[ -n "${GITHUB_TOKEN:-}" ]] && ! command -v gh &> /dev/null; then
        missing_tools+=("gh (GitHub CLI)")
    fi
    
    if [[ ${#missing_tools[@]} -gt 0 ]]; then
        echo -e "${RED}❌ Missing required tools:${NC}"
        for tool in "${missing_tools[@]}"; do
            echo "  - $tool"
        done
        echo ""
        echo -e "${YELLOW}Please install the missing tools and try again.${NC}"
        if [[ " ${missing_tools[*]} " == *"gh (GitHub CLI)"* ]]; then
            echo -e "${BLUE}To install GitHub CLI: https://cli.github.com/${NC}"
        fi
        exit 1
    fi
    
    echo -e "${GREEN}✅ All required tools are installed${NC}"
}

# Function to get Fly.io IP addresses
get_fly_ips() {
    local app_name=$1
    local app_type=$2
    
    echo -e "${YELLOW}📡 Getting IP addresses for $app_name...${NC}"
    
    # Check if app exists
    if ! flyctl apps list | grep -q "$app_name"; then
        echo -e "${RED}❌ App $app_name not found. Please deploy the app first.${NC}"
        return 1
    fi
    
    # Get IP addresses
    local ips_json
    ips_json=$(flyctl ips list --app "$app_name" --json 2>/dev/null || echo "[]")
    
    if [[ "$ips_json" == "[]" ]]; then
        echo -e "${RED}❌ No IP addresses found for $app_name. Please deploy the app first.${NC}"
        return 1
    fi
    
    # Extract IPv4 and IPv6
    local ipv4
    local ipv6
    ipv4=$(echo "$ips_json" | jq -r '.[] | select(.Type == "v4") | .Address' | head -1)
    ipv6=$(echo "$ips_json" | jq -r '.[] | select(.Type == "v6") | .Address' | head -1)
    
    # Handle missing addresses
    if [[ -z "$ipv4" || "$ipv4" == "null" ]]; then
        echo -e "${RED}❌ No IPv4 address found for $app_name${NC}"
        return 1
    fi
    
    if [[ -z "$ipv6" || "$ipv6" == "null" ]]; then
        echo -e "${YELLOW}⚠️  No IPv6 address found for $app_name (this is normal)${NC}"
        ipv6=""
    fi
    
    echo -e "${GREEN}✅ Retrieved IP addresses for $app_name:${NC}"
    echo "  IPv4: $ipv4"
    if [[ -n "$ipv6" ]]; then
        echo "  IPv6: $ipv6"
    fi
    
    # Export variables for use in DNS creation
    if [[ "$app_type" == "prod" ]]; then
        export PROD_IPV4="$ipv4"
        export PROD_IPV6="$ipv6"
    else
        export DEV_IPV4="$ipv4"
        export DEV_IPV6="$ipv6"
    fi
}

# Function to create or update DNS record
create_dns_record() {
    local record_type=$1
    local record_name=$2
    local record_content=$3
    local record_description=$4
    
    if [[ -z "$record_content" ]]; then
        echo -e "${YELLOW}⏭️  Skipping $record_type record for $record_name (no IP address)${NC}"
        return 0
    fi
    
    echo -e "${YELLOW}🔧 Creating/updating $record_type record: $record_name -> $record_content${NC}"
    
    # Check if record already exists
    local existing_records
    existing_records=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records?name=$record_name.$DOMAIN&type=$record_type" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")
    
    local record_id
    record_id=$(echo "$existing_records" | jq -r '.result[0].id // empty')
    
    if [[ -n "$record_id" && "$record_id" != "null" ]]; then
        # Update existing record
        echo -e "${BLUE}🔄 Updating existing $record_type record...${NC}"
        local response
        response=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records/$record_id" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data "{
                \"type\": \"$record_type\",
                \"name\": \"$record_name\",
                \"content\": \"$record_content\",
                \"ttl\": 1,
                \"proxied\": true,
                \"comment\": \"$record_description - Updated via setup-dns.sh\"
            }")
    else
        # Create new record
        echo -e "${BLUE}➕ Creating new $record_type record...${NC}"
        local response
        response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data "{
                \"type\": \"$record_type\",
                \"name\": \"$record_name\",
                \"content\": \"$record_content\",
                \"ttl\": 1,
                \"proxied\": true,
                \"comment\": \"$record_description - Created via setup-dns.sh\"
            }")
    fi
    
    # Check if the request was successful
    local success
    success=$(echo "$response" | jq -r '.success')
    
    if [[ "$success" == "true" ]]; then
        echo -e "${GREEN}✅ Successfully configured $record_type record for $record_name${NC}"
    else
        local errors
        errors=$(echo "$response" | jq -r '.errors[] | .message' | tr '\n' ' ')
        echo -e "${RED}❌ Failed to configure $record_type record for $record_name: $errors${NC}"
        return 1
    fi
}

# Function to verify DNS propagation
verify_dns() {
    local domain=$1
    local expected_ip=$2
    
    echo -e "${YELLOW}🔍 Verifying DNS propagation for $domain...${NC}"
    
    # Give DNS some time to propagate
    sleep 5
    
    local resolved_ip
    resolved_ip=$(dig +short "$domain" @8.8.8.8 | head -1)
    
    if [[ "$resolved_ip" == "$expected_ip" ]]; then
        echo -e "${GREEN}✅ DNS propagation successful for $domain${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  DNS propagation pending for $domain (resolved: $resolved_ip, expected: $expected_ip)${NC}"
        echo -e "${BLUE}ℹ️  This is normal and may take a few minutes to fully propagate${NC}"
        return 1
    fi
}

# Function to setup SSL certificates on Fly.io
setup_ssl_certificates() {
    echo -e "${YELLOW}🔒 Setting up SSL certificates on Fly.io...${NC}"
    
    # Production SSL certificate
    echo -e "${BLUE}🔧 Creating SSL certificate for $DOMAIN...${NC}"
    if flyctl certs create "$DOMAIN" --app "$PROD_APP_NAME" 2>/dev/null; then
        echo -e "${GREEN}✅ SSL certificate created for $DOMAIN${NC}"
    else
        echo -e "${YELLOW}⚠️  SSL certificate for $DOMAIN may already exist${NC}"
    fi
    
    # Development SSL certificate
    echo -e "${BLUE}🔧 Creating SSL certificate for dev.$DOMAIN...${NC}"
    if flyctl certs create "dev.$DOMAIN" --app "$DEV_APP_NAME" 2>/dev/null; then
        echo -e "${GREEN}✅ SSL certificate created for dev.$DOMAIN${NC}"
    else
        echo -e "${YELLOW}⚠️  SSL certificate for dev.$DOMAIN may already exist${NC}"
    fi
    
    # Show certificate status
    echo -e "${BLUE}📋 SSL Certificate Status:${NC}"
    echo -e "${YELLOW}Production ($DOMAIN):${NC}"
    flyctl certs list --app "$PROD_APP_NAME" || true
    echo ""
    echo -e "${YELLOW}Development (dev.$DOMAIN):${NC}"
    flyctl certs list --app "$DEV_APP_NAME" || true
}

# Main execution
main() {
    echo -e "${GREEN}🚀 Starting DNS setup for NextNode Frontend${NC}"
    echo ""
    
    # Pre-flight checks
    check_dependencies
    check_env_vars
    
    echo ""
    echo -e "${BLUE}📋 Configuration:${NC}"
    echo "  Domain: $DOMAIN"
    echo "  Production app: $PROD_APP_NAME"
    echo "  Development app: $DEV_APP_NAME"
    echo ""
    
    # Get IP addresses from Fly.io apps
    get_fly_ips "$PROD_APP_NAME" "prod"
    get_fly_ips "$DEV_APP_NAME" "dev"
    
    echo ""
    echo -e "${YELLOW}🌐 Configuring DNS records...${NC}"
    
    # Create DNS records for production (root domain)
    create_dns_record "A" "@" "$PROD_IPV4" "NextNode Frontend Production"
    if [[ -n "$PROD_IPV6" ]]; then
        create_dns_record "AAAA" "@" "$PROD_IPV6" "NextNode Frontend Production IPv6"
    fi
    
    # Create DNS records for development (dev subdomain)
    create_dns_record "A" "dev" "$DEV_IPV4" "NextNode Frontend Development"
    if [[ -n "$DEV_IPV6" ]]; then
        create_dns_record "AAAA" "dev" "$DEV_IPV6" "NextNode Frontend Development IPv6"
    fi
    
    echo ""
    echo -e "${YELLOW}🔍 Verifying DNS propagation...${NC}"
    
    # Verify DNS propagation
    verify_dns "$DOMAIN" "$PROD_IPV4"
    verify_dns "dev.$DOMAIN" "$DEV_IPV4"
    
    echo ""
    
    # Setup SSL certificates
    setup_ssl_certificates
    
    echo ""
    echo -e "${GREEN}🎉 DNS setup completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}📝 Next steps:${NC}"
    echo "1. Wait 5-10 minutes for full DNS propagation"
    echo "2. Test your applications:"
    echo "   - Production: https://$DOMAIN"
    echo "   - Development: https://dev.$DOMAIN"
    echo "3. Monitor SSL certificate validation in Fly.io dashboard"
    echo ""
    echo -e "${GREEN}🔗 Your applications should now be accessible via custom domains!${NC}"
}

# Run main function
main "$@"