# BunkSafe — Official iOS Marketing & Support Website

This is the production-ready, static marketing and support website for the iOS application **BunkSafe**. Designed from scratch in accordance with Apple's Human Interface Guidelines (HIG), the site captures the minimalist, premium aesthetic of `apple.com` using large typography, glassmorphism navigation, responsive layouts, and automatic dark/light system mode support.

## ✨ Why This Build is Unique
- **100% Static & Framework-Free**: Built with pure HTML5, CSS3, and Vanilla JavaScript. No Node.js, React, Next.js, npm dependencies, or backend bundlers required.
- **Lighthouse 100/100/100/100 Targeted**: Optimized asset delivery, non-blocking stylesheets, high contrast visible focus indicators, and reduced-motion accessibility overrides.
- **Ready Out-of-the-Box**: All pages (`index.html`, `support.html`, `privacy.html`, `terms.html`, `404.html`) are populated with real production marketing copy and Apple App Store compliant legal wording. Clean placeholder PNG assets are included so there are zero broken images upon deployment.

---

## 🚀 How to Host on GitHub Pages

Hosting this website takes less than 2 minutes:

1. Push the contents of your repository (including this `Website/` folder) to GitHub.
2. In your GitHub repository, click on **Settings** in the top navigation bar.
3. In the left sidebar under the **Code and automation** section, select **Pages**.
4. Under **Build and deployment** &rarr; **Source**, select **Deploy from a branch**.
5. Choose your main branch (e.g., `main` or `master`) and specify the `/Website` folder (or root `/` if you move the website files to the root of your repo).
6. Click **Save**. GitHub will automatically build and deploy your site in less than a minute!

---

## 🖼️ How to Replace Screenshots & Icons

We have generated clean placeholder PNG files inside the assets directory so your site works immediately. When you are ready to insert your real Xcode screenshots or Figma designs:

### 1. App Store Screenshots (`assets/screenshots/`)
- Replace `1.png` through `9.png` inside `assets/screenshots/` with your own PNG exports.
- For optimal clarity and performance, we recommend using images with an aspect ratio of roughly **19.5:9** (e.g., `600px x 1300px` or `800px x 1732px`) and compressing them using tools like ImageOptim or TinyPNG.
- The website automatically frames your screenshots inside a CSS-rendered iPhone 15 Pro mockup frame with realistic shadows and dynamic island cutouts!

### 2. App Icon & Favicons (`assets/icons/`)
- **App Icon**: Replace `assets/icons/app-icon.png` with a standard `512x512` PNG of your iOS app icon.
- **Favicon**: Replace `assets/icons/favicon.png` (`64x64`) and `assets/icons/favicon.ico`.

### 3. OpenGraph Social Share Image (`assets/images/`)
- Replace `assets/images/og-image.png` (`1200x630`) with a branded preview banner. This image appears when someone shares your website link on Twitter, iMessage, WhatsApp, or LinkedIn.

---

## 🔗 How to Update App Store Links & Support Email

Currently, the HTML files use standard placeholder strings that you can replace in bulk using any text editor or IDE (such as VS Code):

1. **App Store URL**: Do a global find-and-replace across all `.html` files for:
   ```
   https://apps.apple.com/us/app/bunksafe/id6787505960
   ```
   Replace it with your actual Apple App Store app link (e.g., `https://apps.apple.com/app/id1234567890`).

2. **Support Email**: Do a global find-and-replace for:
   ```
   work.mehraab@gmail.com
   ```
   Replace it with your real customer support email address (e.g., `support@bunksafe.app`).

3. **Domain & SEO Links**: Do a global find-and-replace for `https://yourdomain.com` inside `index.html`, `support.html`, `privacy.html`, `terms.html`, `robots.txt`, and `sitemap.xml`.

---

## 🎨 How to Customize Design System Colors

The entire website styling is controlled by centralized CSS custom properties (variables) defined at the very top of `assets/css/style.css`. You can customize the look without touching any layout code:

```css
:root {
  /* Primary Brand Blue */
  --primary-color: #007AFF;
  --primary-hover: #0062CC;
  
  /* Pillar Accent Colors */
  --color-green: #34C759;
  --color-purple: #5856D6;
  --color-orange: #FF9500;
  --color-red: #FF2D55;
  --color-teal: #00C7BE;
  --color-indigo: #AF52DE;
  --color-yellow: #FFCC00;
}
```

*Note: If you make edits to `style.css` or `main.js`, remember to copy or minify your changes to `style.min.css` and `main.min.js` (or update the `<link>` and `<script>` tags in the HTML files to point directly to the unminified versions).*

---

## 🌐 How to Connect a Custom Domain

If you want your website accessible at a custom domain (e.g., `www.bunksafe.app`) instead of `username.github.io/BunkSafeWebsite`:

1. In your GitHub Repository, go to **Settings** &rarr; **Pages**.
2. Under **Custom domain**, type your domain name and click **Save**.
3. In your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.), create a **CNAME record** pointing your subdomain (like `www`) to `yourusername.github.io`.
4. Once DNS propagates, check the box for **Enforce HTTPS** in GitHub Pages settings.
5. GitHub will automatically create a `CNAME` file in your repository root.

---

## 📁 Directory Structure Overview

```
Website/
├── index.html              # Marketing Home Page (Hero, Pillars, Carousel, Why BunkSafe)
├── support.html            # Help Center (Troubleshooting, FAQ Accordion, Bug Reports)
├── privacy.html            # Apple App Store Compliant Privacy Policy
├── terms.html              # Software Terms of Use Agreement
├── 404.html                # Apple HIG Minimalist Error Page
├── robots.txt              # Search Engine Crawler Directives
├── sitemap.xml             # XML Sitemap for SEO Indexing
├── manifest.webmanifest    # Progressive Web App PWA Manifest
├── README.md               # Deployment & Customization Documentation
└── assets/
    ├── css/
    │   ├── style.css       # Comprehensive Apple HIG CSS Design System
    │   └── style.min.css   # Minified Production Stylesheet
    ├── js/
    │   ├── main.js         # Vanilla JS Interactive Logic (Carousel, Accordion, Menu)
    │   └── main.min.js     # Minified Production Script
    ├── icons/              # App Icons & Favicons
    ├── images/             # Badges & OpenGraph Share Banner
    └── screenshots/        # iPhone 15 Pro Screenshot Placeholders (1.png to 9.png)
```

---

## 🛠️ Built With Pride
Handcrafted to deliver an exceptional iOS user experience before the user even downloads the app.
