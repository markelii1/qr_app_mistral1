# Apple-Style Light Theme Integration Guide

## 🎨 Beautiful Light Theme for Your Website

This package provides a complete Apple-inspired light theme with:
- Elegant light color palette based on Apple Design System
- Smooth theme switching (light/dark/system)
- Glassmorphism effects
- SF Pro typography (with fallbacks)
- Responsive design
- Accessibility features

---

## 📁 Files Created

1. **`light-theme.css`** - Complete CSS with all theme variables and styles
2. **`theme-toggle.js`** - JavaScript for theme switching
3. **`beautiful-light-theme.html`** - Example HTML with integrated theme
4. **`theme-integration.html`** - Complete integration example with inline styles

---

## 🚀 Quick Integration (Recommended)

### Option 1: Use External CSS (Best Performance)

1. **Add CSS to your `<head>`:**
```html
<link rel="stylesheet" href="light-theme.css" />
```

2. **Add theme attribute to `<html>` or `<body>`:**
```html
<html data-theme="light">
```

3. **Add theme toggle button (anywhere in your HTML):**
```html
<button class="theme-toggle no-print" aria-label="Toggle theme" aria-pressed="false" data-theme-toggle>
  <span class="theme-toggle-icon sun" style="display: none;">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
    </svg>
  </span>
  <span class="theme-toggle-icon moon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </span>
</button>
```

4. **Add JavaScript before `</body>`:**
```html
<script src="theme-toggle.js"></script>
```

5. **Initialize theme immediately (optional, prevents flash):**
```html
<script>
  (function() {
    var theme = localStorage.getItem('theme-preference') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

---

### Option 2: Use Inline Styles (Single File)

If you prefer everything in one file, use the content from `theme-integration.html`:

1. Copy all the `<style>` content to your `<head>`
2. Copy the button HTML where you want the toggle
3. Copy the `<script>` content before `</body>`

---

## 🎨 Theme Color Palette

### Light Theme Colors
- **Background Primary**: `#ffffff`
- **Background Secondary**: `#f5f5f7`
- **Background Tertiary**: `#f2f2f7`
- **Text Primary**: `#1d1d1f`
- **Text Secondary**: `#424245`
- **Text Tertiary**: `#86868b`
- **Text Muted**: `#cccccc`

### Dark Theme Colors
- **Background Primary**: `#000000`
- **Background Secondary**: `#1d1d1f`
- **Text Primary**: `#f5f5f7`
- **Text Secondary**: `#cccccc`
- **Text Tertiary**: `#86868b`

### Accent Colors
- **Apple Blue**: `#0071e3` (Primary CTA)
- **Link Blue**: `#2997ff` (Links)
- **Deep Link**: `#0066cc`
- **Success**: `#34d399`
- **Warning**: `#fbbf24`
- **Error**: `#f87171`

---

## 📝 CSS Custom Properties

### Colors
```css
--bg-primary, --bg-secondary, --bg-tertiary
--text-primary, --text-secondary, --text-tertiary, --text-muted
--surface-primary, --surface-secondary, --surface-elevated
--border-light, --border-medium, --border-strong
--accent-primary, --accent-secondary
```

### Typography
```css
--font-sf-pro-display, --font-sf-pro-text
--text-caption, --text-body-sm, --text-body, --text-body-lg
--text-subheading, --text-heading, --text-heading-lg, --text-display
--leading-caption, --leading-body, --leading-subheading, etc.
--tracking-caption, --tracking-body, --tracking-heading, etc.
```

### Spacing
```css
--spacing-1 (4px) through --spacing-20 (80px)
--page-max-width: 1440px
--nav-height: 44px
```

### Border Radius
```css
--radius-sm (6px) through --radius-full (9999px)
--radius-cards: 28px
--radius-buttons: 9999px
--radius-inputs: 210px
```

---

## 🎯 Pre-built Components

### Cards
```html
<div class="card">Content</div>
<div class="card-elevated">Elevated Content</div>
<div class="card-glass">Glass Card</div>
```

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn-pill">Pill</button>
<button class="apple-btn-primary">Apple Style</button>
```

### Typography
```html
<h1 class="display">Display Title</h1>
<h2 class="heading-lg">Large Heading</h2>
<h3 class="heading">Heading</h3>
<p class="body-lg">Large body text</p>
<p class="body">Body text</p>
<p class="body-sm">Small body text</p>
<span class="caption">Caption</span>
```

### Forms
```html
<input type="text" class="input" placeholder="Enter text" />
<textarea class="textarea" placeholder="Enter message"></textarea>
<label class="label">Label</label>
```

### Navigation
```html
<nav class="nav">
  <div class="nav-content">
    <a href="#" class="nav-link">Home</a>
    <a href="#" class="nav-link">About</a>
  </div>
</nav>
```

---

## ⚙️ JavaScript API

After integration, you can use the global `themeToggle` object:

```javascript
// Toggle between light and dark
themeToggle.toggle();

// Set a specific theme
themeToggle.set('light');  // 'light', 'dark', or 'system'

// Get current theme
const current = themeToggle.get(); // 'light' or 'dark'

// Get stored preference
const stored = themeToggle.getStored(); // 'light', 'dark', or 'system'

// Get system preference
const system = themeToggle.getSystem(); // 'light' or 'dark'
```

---

## 💡 Usage Tips

### 1. Default to System Preference
The theme will automatically respect the user's system preference if no preference is stored.

### 2. Persist User Preference
User preference is stored in `localStorage` and persists across sessions.

### 3. Smooth Transitions
All theme transitions are animated for a smooth experience.

### 4. Accessibility
- Proper ARIA attributes
- Keyboard navigation support
- Reduced motion support
- High contrast mode support

### 5. Performance
- Critical CSS is inlined for faster loading
- External CSS for better caching
- Efficient JavaScript with event delegation

---

## 🎨 Customization

### Change Default Theme
```html
<html data-theme="dark">  <!-- Start with dark theme -->
```

### Add Custom Colors
```css
:root {
  --my-custom-color: #ff0000;
}

[data-theme="dark"] {
  --my-custom-color: #ff6666;
}
```

### Extend Typography
```css
.my-custom-heading {
  font-family: var(--font-sf-pro-display);
  font-size: 56px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}
```

---

## 📱 Responsive Design

The theme includes responsive utilities:
- Mobile-first approach
- Breakpoints at 768px and 1024px
- Flexible container widths
- Responsive typography with `clamp()`

---

## ✨ Features

✅ **Apple Design System** - Faithful implementation of Apple's aesthetic
✅ **Theme Switching** - Light, Dark, and System preferences
✅ **Glassmorphism** - Beautiful frosted glass effects
✅ **SF Pro Typography** - With system font fallbacks
✅ **Responsive** - Works on all screen sizes
✅ **Accessible** - WCAG compliant
✅ **Performance Optimized** - Fast loading and smooth transitions
✅ **Customizable** - Easy to extend and modify
✅ **No Dependencies** - Pure CSS and vanilla JavaScript

---

## 📄 License

This theme is provided as-is for your use. Feel free to modify and use it in your projects.

---

## 🙏 Credits

Inspired by Apple's Design System and the beautiful work of the Apple design team.

---

## 🎯 Next Steps

1. Copy the files to your project
2. Integrate using one of the methods above
3. Customize colors and components as needed
4. Test on different devices and browsers
5. Enjoy your beautiful new theme!
