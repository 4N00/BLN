#!/bin/bash

# Deployment script - pushes to git and triggers Vercel deployment
# Usage: ./deploy.sh or npm run push:deploy

echo ""
echo "📦 Pushing to GitHub..."
echo ""

# Push to git
git push "$@"

# Check if push was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Successfully pushed to GitHub"
    echo ""
    echo "🚀 Triggering Vercel deployment..."
    echo ""

    # Trigger Vercel deployment
    response=$(curl -s -w "\n%{http_code}" -X POST "https://api.vercel.com/v1/integrations/deploy/prj_K6e2m1HGK1IY3kxVn6VQkBJ47CVA/sqXEbLxnPm")

    http_code=$(echo "$response" | tail -n1)

    if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
        echo "✓ Vercel deployment triggered successfully!"
        echo "→ Check deployment status: https://vercel.com/dashboard"
    else
        echo "⚠ Deployment trigger status: HTTP $http_code"
        echo "→ Check Vercel dashboard for details"
    fi
else
    echo ""
    echo "✗ Git push failed"
    echo "→ Fix the errors above and try again"
    exit 1
fi

echo ""
