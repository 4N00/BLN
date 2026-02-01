# Deployment Checklist for Vercel

## Pre-Deployment

### 1. Code Quality
- [x] All TypeScript errors resolved
- [x] ESLint warnings addressed
- [x] Build completes successfully (`npm run build`)
- [x] No console errors in browser
- [x] All translations complete (EN & NL)

### 2. Content Review
- [ ] All images loading correctly
- [ ] All links working (internal & external)
- [ ] Contact email correct: hello@loesnooitgedagt.com
- [ ] Social media links updated
- [ ] Copyright year current

### 3. SEO & Meta Tags
- [x] Meta descriptions present on all pages
- [x] Open Graph images configured
- [x] Structured data (JSON-LD) implemented
- [x] Sitemap.xml generated
- [x] Robots.txt configured
- [ ] Favicon and app icons present

### 4. Performance
- [x] Images optimized (using Next.js Image)
- [x] Lazy loading enabled
- [x] Bundle size optimized
- [x] Fonts optimized (Google Fonts)
- [x] Analytics integrated (Vercel)

### 5. Accessibility
- [x] ARIA labels added
- [x] Skip to main content link
- [x] Keyboard navigation works
- [x] Alt text for all images
- [x] Color contrast meets WCAG AA

### 6. Mobile Responsiveness
- [ ] Test on mobile devices (iOS & Android)
- [ ] Test on tablets
- [ ] Test landscape orientation
- [ ] Touch interactions work
- [ ] Mobile menu functions correctly

### 7. Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS (latest)

## Vercel Deployment Steps

### 1. Initial Setup
1. Push code to GitHub/GitLab
2. Import project in Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Install Command: `npm install --legacy-peer-deps`
   - Output Directory: `.next`

### 2. Environment Variables
Configure in Vercel dashboard:
```
NEXT_PUBLIC_SITE_URL=https://loesnooitgedagt.com
```

### 3. Domain Configuration
1. Add custom domain: `loesnooitgedagt.com`
2. Configure DNS (A record or CNAME)
3. Wait for SSL certificate (automatic)
4. Test HTTPS redirect

### 4. Analytics Configuration
- Vercel Analytics: Enabled automatically
- Speed Insights: Enabled automatically

## Post-Deployment Testing

### 1. Functional Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Language switcher (EN/NL) functions
- [ ] Portfolio pages display images
- [ ] Contact page displays correctly
- [ ] 404 page displays for invalid URLs

### 2. Performance Testing
- [ ] Google PageSpeed Insights score > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1

### 3. SEO Testing
- [ ] Google Search Console setup
- [ ] Sitemap submitted to Google
- [ ] Robots.txt accessible
- [ ] Meta tags visible in source
- [ ] Structured data valid (Google Rich Results Test)

### 4. Analytics Testing
- [ ] Vercel Analytics tracking pageviews
- [ ] Speed Insights collecting data
- [ ] No tracking errors in console

### 5. Cross-Browser Testing
- [ ] Chrome: All features work
- [ ] Firefox: All features work
- [ ] Safari: All features work
- [ ] Edge: All features work
- [ ] Mobile Safari: All features work

### 6. Accessibility Testing
- [ ] Lighthouse Accessibility score > 95
- [ ] Screen reader navigation works
- [ ] Keyboard-only navigation works
- [ ] Focus indicators visible

## Monitoring & Maintenance

### Ongoing Tasks
- [ ] Monitor Vercel Analytics weekly
- [ ] Check for broken links monthly
- [ ] Update content regularly
- [ ] Monitor Core Web Vitals
- [ ] Review error logs
- [ ] Update dependencies quarterly

### Performance Monitoring
- [ ] Set up Vercel monitoring alerts
- [ ] Track page load times
- [ ] Monitor 404 errors
- [ ] Track conversion metrics

## Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version (18+)
- Clear `.next` and `node_modules`
- Reinstall with `npm install --legacy-peer-deps`

**Images Not Loading:**
- Check Next.js Image domains in `next.config.mjs`
- Verify image URLs are accessible
- Check browser console for errors

**404 on Routes:**
- Verify `[locale]` folder structure
- Check middleware configuration
- Ensure all pages are in correct directories

**Analytics Not Tracking:**
- Verify Vercel Analytics is enabled
- Check ad blockers aren't interfering
- Wait 24 hours for initial data

## Emergency Rollback

If critical issues occur:
1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find last stable deployment
4. Click "..." → "Promote to Production"

## Contact & Support

- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs
- Project Email: hello@loesnooitgedagt.com
