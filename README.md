# Loes Nooitgedagt Photography Portfolio

A high-end photography portfolio website built with Next.js 15, featuring smooth animations, internationalization (EN/NL), and optimal performance.

## Features

- ✨ **Modern Design**: Elegant, minimal design with custom animations
- 🌐 **Internationalization**: Full support for English and Dutch
- 🎭 **Advanced Animations**: Framer Motion for smooth page transitions
- 📱 **Fully Responsive**: Optimized for all device sizes
- ⚡ **Performance Optimized**: Fast loading, lazy loading images, optimized bundle
- 🔍 **SEO Ready**: Meta tags, Open Graph, structured data, sitemap
- ♿ **Accessible**: ARIA labels, skip links, keyboard navigation
- 📊 **Analytics**: Vercel Analytics and Speed Insights integrated
- 🎨 **Custom Cursor**: Interactive custom cursor effects
- 🖼️ **Image Optimization**: Next.js Image with AVIF/WebP support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Smooth Scroll**: Lenis
- **Internationalization**: next-intl
- **Analytics**: Vercel Analytics & Speed Insights
- **Font**: Google Fonts (Inter, Cormorant Garamond, Playfair Display)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd BLN
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Run development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Automatic Deployment

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project to Vercel
3. Vercel will automatically detect Next.js and deploy

### Manual Configuration

If needed, configure these settings in Vercel:

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install --legacy-peer-deps`

**Environment Variables:**
```
NEXT_PUBLIC_SITE_URL=https://loesnooitgedagt.com
```

**Domain:**
- Add your custom domain: `loesnooitgedagt.com`
- Vercel will automatically configure SSL

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/         # About page
│   │   │   ├── contact/       # Contact page
│   │   │   ├── investment/    # Investment/pricing page
│   │   │   ├── portfolio/     # Portfolio pages
│   │   │   ├── error.tsx      # Error boundary
│   │   │   ├── not-found.tsx  # 404 page
│   │   │   └── loading.tsx    # Loading state
│   │   ├── layout.tsx         # Root layout
│   │   ├── robots.ts          # Robots.txt
│   │   └── sitemap.ts         # XML sitemap
│   ├── components/            # React components
│   ├── context/               # React context providers
│   ├── i18n/                  # Internationalization config
│   ├── lib/                   # Utility functions
│   └── shaders/               # WebGL shaders
├── messages/                  # Translation files
│   ├── en.json               # English translations
│   └── nl.json               # Dutch translations
├── public/                    # Static assets
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── vercel.json               # Vercel deployment config
└── package.json              # Dependencies

```

## Pages

- **Home** (`/`) - Hero section, project gallery, services
- **About** (`/about`) - About the photographer, philosophy, stats
- **Portfolio** (`/portfolio/*`) - Category-specific portfolios
  - Lifestyle
  - Wedding
  - Brand
  - Portrait
  - Event
- **Investment** (`/investment`) - Pricing packages and FAQs
- **Contact** (`/contact`) - Contact information

## Internationalization

The site supports English (EN) and Dutch (NL) with automatic locale detection:

- Cookie-based language preference
- Browser language detection fallback
- Language switcher in navigation
- All content fully translated

To add translations, edit:
- `messages/en.json` - English
- `messages/nl.json` - Dutch

## Performance Optimizations

- ✅ Image optimization (AVIF, WebP)
- ✅ Lazy loading for images
- ✅ Code splitting and tree shaking
- ✅ Font optimization
- ✅ Compression enabled
- ✅ Minimal bundle size
- ✅ Efficient caching headers
- ✅ Remove console logs in production

## SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (social media sharing)
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD)
- ✅ XML sitemap
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Alt tags for all images
- ✅ Semantic HTML

## Accessibility Features

- ✅ ARIA labels
- ✅ Skip to main content link
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Screen reader support
- ✅ Semantic HTML structure
- ✅ Color contrast compliance

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private - All rights reserved

## Contact

For inquiries: hello@loesnooitgedagt.com

---

Built with ❤️ by Loes Nooitgedagt
