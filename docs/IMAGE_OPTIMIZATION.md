# Image Optimization Best Practices (2026)

## Implementation Summary

### ✅ What We're Doing Right

1. **Next.js Image Component**: Using built-in optimization for automatic format selection (AVIF > WebP > JPEG/PNG)
2. **Lazy Loading**: Non-critical images load lazily with `loading="lazy"`
3. **Priority Loading**: Hero/LCP images use `priority={true}` for immediate loading
4. **Responsive Sizes**: Using `sizes` attribute for optimal image selection
5. **Quality Control**: Set to 85% for optimal quality/size balance
6. **Error Handling**: Graceful fallbacks for failed loads
7. **WebGL Enhancement**: Performance-optimized canvas rendering with fallback

### 🚀 2026 Enhancements Implemented

#### 1. Enhanced Intersection Observer
- **Preload margin**: Images start loading 50px before entering viewport
- **One-time observation**: Disconnect after triggering to save resources
- **Threshold optimization**: 0.01 for earlier detection

#### 2. fetchPriority Attribute
```tsx
<OptimizedImage
  priority={true}
  fetchPriority="high"  // For LCP images
/>
```

#### 3. Smart Loading Strategy
- **Above-the-fold**: `priority={true}` + `fetchPriority="high"` + `loading="eager"`
- **Below-the-fold**: `priority={false}` + `loading="lazy"` + Intersection Observer
- **Background images**: Lowest priority, load on scroll proximity

## Usage Guidelines

### Hero Images (LCP)
```tsx
<OptimizedImage
  src="/hero.jpg"
  alt="Hero image"
  priority={true}
  fetchPriority="high"
  sizes="100vw"
  quality={90}
/>
```

### Portfolio Grid Images
```tsx
<OptimizedImage
  src="/portfolio-item.jpg"
  alt="Portfolio item"
  priority={false}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
/>
```

### Thumbnail Images
```tsx
<OptimizedImage
  src="/thumbnail.jpg"
  alt="Thumbnail"
  priority={false}
  sizes="(max-width: 768px) 50vw, 25vw"
  quality={80}
/>
```

## Performance Metrics

### Target Scores
- **LCP (Largest Contentful Paint)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FID (First Input Delay)**: < 100ms

### Image Format Priority
1. **AVIF** - Best compression, modern browsers (2024+)
2. **WebP** - Good compression, wide support
3. **JPEG/PNG** - Fallback for legacy browsers

## Monitoring

Check Lighthouse scores regularly:
```bash
npm run build
npx lighthouse http://localhost:3000 --view
```

### Key Metrics to Watch
- Image format usage (should be mostly AVIF/WebP)
- Lazy-loaded images count
- LCP element (should be optimized with priority)
- Total image weight per page
- Network waterfall (images shouldn't block render)

## Advanced Optimizations

### 1. Image CDN Configuration
Already configured via Vercel with:
- Automatic format conversion
- Smart caching (1 year TTL)
- Global edge delivery
- On-demand optimization

### 2. Blur Placeholders (Future Enhancement)
Consider adding low-quality image placeholders:
```tsx
<Image
  src="/image.jpg"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 3. Art Direction (Future Enhancement)
Different images for different viewports:
```tsx
<picture>
  <source media="(max-width: 768px)" srcSet="/mobile.jpg" />
  <source media="(min-width: 769px)" srcSet="/desktop.jpg" />
  <img src="/desktop.jpg" alt="Responsive image" />
</picture>
```

## Testing Checklist

- [ ] Hero images load immediately (priority={true})
- [ ] Below-fold images lazy load
- [ ] Images use AVIF/WebP in modern browsers
- [ ] Proper sizes attribute for responsive images
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast LCP (< 2.5s)
- [ ] Images cached properly (1 year TTL)
- [ ] Fallback to Next.js Image for WebGL errors

## Browser Support

| Feature | Support |
|---------|---------|
| AVIF | Chrome 85+, Firefox 93+, Safari 16+ |
| WebP | Chrome 23+, Firefox 65+, Safari 14+ |
| Lazy Loading | Chrome 77+, Firefox 75+, Safari 15.4+ |
| Intersection Observer | All modern browsers |
| fetchPriority | Chrome 101+, Edge 101+ |

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Core Web Vitals](https://web.dev/vitals/)
- [AVIF Support](https://caniuse.com/avif)
