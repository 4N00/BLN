# Deployment Guide

## Automated Deployment to Vercel

This project is configured with automated Vercel deployments using webhooks.

### Quick Deploy

**Option 1: Using the deploy script (Recommended)**
```bash
./deploy.sh
```
This will:
1. Push your commits to GitHub
2. Automatically trigger a Vercel deployment
3. Show you the deployment status

**Option 2: Using npm scripts**
```bash
# Push and deploy in one command
npm run push:deploy

# Or trigger Vercel deployment manually (without pushing)
npm run deploy:vercel
```

**Option 3: Traditional git push + manual deploy**
```bash
git push
npm run deploy:vercel
```

### How It Works

- **Webhook URL**: Configured in `package.json` and `deploy.sh`
- **Git Hooks**: Post-commit hook reminds you to deploy
- **Vercel Integration**: Direct webhook triggers build on Vercel

### Troubleshooting

If deployment fails:

1. **Check Vercel Dashboard**: https://vercel.com/dashboard
2. **Verify webhook is active**: Project Settings → Git → Deploy Hooks
3. **Manual trigger**: Run `npm run deploy:vercel`
4. **Check build logs**: Vercel Dashboard → Your Project → Deployments

### Environment Variables

Make sure all required environment variables are set in Vercel:
- Go to Vercel Dashboard → Project → Settings → Environment Variables
- Add any missing variables from `.env.example`

### Git Workflow

```bash
# Make your changes
git add .
git commit -m "Your commit message"

# Deploy to Vercel
./deploy.sh
```

### Vercel CLI (Alternative)

If you prefer using Vercel CLI:

```bash
# Login to Vercel
vercel login

# Link project (first time only)
vercel link

# Deploy to production
vercel --prod
```

## Production URL

Your site will be deployed at your configured Vercel domain.
Check the deployment status in your Vercel dashboard.
