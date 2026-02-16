# ICONICS'26 Website Redesign - Implementation Plan

## 🎯 Design Vision

**Theme:** Monochrome minimalism with brutalist typography
**Style:** Premium, modern, scroll-driven storytelling
**Inspiration:** Lenis.darkroom + Apple iPhone pages
**Focus:** Unique layouts, impactful animations, non-generic feel

---

## 🎨 Design System

### Color Palette (Monochrome)
```css
/* Backgrounds */
--bg-primary: #FFFFFF
--bg-secondary: #F8F9FA
--bg-tertiary: #F3F4F6

/* Text */
--text-primary: #111827      /* Charcoal black */
--text-secondary: #6B7280    /* Medium gray */
--text-muted: #9CA3AF        /* Light gray */

/* Accents */
--accent-dark: #1F2937       /* Dark charcoal */
--accent-medium: #374151     /* Medium charcoal */

/* Borders */
--border-light: #E5E7EB
--border-medium: #D1D5DB

/* Gradients */
--gradient-subtle: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)
--gradient-mesh: radial-gradient(at 50% 0%, #F9FAFB 0%, #FFFFFF 100%)
```

### Typography
```css
/* Font Stack: Brutalist */
--font-heading: 'Archivo Black', sans-serif  /* Hero, section titles */
--font-body: 'Inter', sans-serif             /* Body text */
--font-accent: 'Space Mono', monospace       /* Stats, counters */

/* Sizes */
--text-hero: clamp(4rem, 12vw, 10rem)
--text-display: clamp(2.5rem, 6vw, 5rem)
--text-heading: clamp(2rem, 4vw, 3rem)
--text-body: 1rem
--text-small: 0.875rem

/* Weights */
--weight-black: 900
--weight-bold: 700
--weight-medium: 500
--weight-regular: 400
```

---

## 📐 Page Layout Structure

### Home Page Flow (Scroll-Based Story)

```
1. HERO SECTION (100vh)
   ├─ Three.js network background (nodes + lines)
   ├─ Massive typography: "iCONICS'26"
   ├─ Subtitle + location
   ├─ Event countdown timer
   ├─ Stats bar (3 metrics)
   └─ Dual CTAs with magnetic hover

2. ABOUT + STATS SPLIT (scroll trigger)
   ├─ Left: About text slides from left
   ├─ Right: Stats panel slides from right
   └─ Both settle with parallax effect

3. RESEARCH TRACKS (horizontal scroll)
   ├─ 8 cards in horizontal scroll container
   ├─ Mixed animations: some flip, some expand
   ├─ Scroll indicator (left/right arrows)
   └─ Each card reveals on scroll into view

4. SPEAKERS SECTION (organic layout)
   ├─ Heading with reveal animation
   ├─ 6 speakers in scattered/bento grid
   ├─ Cards fly in with stagger
   ├─ Varying sizes (2 large, 4 medium)
   └─ Hover: scale + shadow

5. TIMELINE (vertical progressive)
   ├─ Vertical line draws as you scroll
   ├─ Events fade in when line reaches
   ├─ Pin section while scrolling
   └─ Smooth transitions

6. CTA SECTION (parallax background)
   ├─ Morphing shapes in background
   ├─ Bold typography
   ├─ Dual CTAs
   └─ Subtle parallax on scroll
```

---

## 🛠️ Technical Stack

### New Dependencies
```json
{
  "three": "^0.160.0",
  "gsap": "^3.12.5",
  "@gsap/react": "^2.1.0",
  "locomotive-scroll": "^5.0.0-beta.11"
}
```

### Remove
- Dark mode context/provider
- Red accent colors
- Banner component
- Old mesh gradient

### Keep
- Framer Motion (component animations)
- React Router
- Lenis (or replace with Locomotive)
- Tailwind CSS

---

## 🎬 Animation Details

### Hero Section

**Three.js Network Background:**
```javascript
- 80-120 particles (white/light gray nodes)
- Lines connect nodes within 150px radius
- Lines color: rgba(17, 24, 39, 0.15) // Charcoal with transparency
- Mouse interaction:
  - Nodes within 200px of cursor get pulled toward it
  - Lines to cursor-nearby nodes become darker
  - Smooth lerp animation (0.1 ease)
- Ambient animation: slow drift (noise-based)
- Responsive: fewer particles on mobile
```

**Typography Animation:**
```javascript
- Letters split using SplitType or Framer Motion
- Stagger reveal: each letter fades + scales (0.9 → 1)
- Duration: 1.2s, delay: 0.05s per letter
- Ease: "cubic-bezier(0.22, 1, 0.36, 1)"
```

**Countdown Timer:**
```javascript
- Position: Below subtitle
- Format: "XX Days XX Hours XX Minutes XX Seconds"
- Font: Space Mono
- Size: 1.5rem
- Color: Charcoal
- Updates every second
- Animate: flip animation on number change
```

**Stats Bar:**
```javascript
- 3 metrics: Attendees | Speakers | Tracks
- Animated counters (count up on load)
- Separator: vertical line (1px, gray)
- Font: Space Mono
- Layout: Horizontal row, centered
```

**CTA Buttons:**
```javascript
- Magnetic hover effect:
  - Button moves toward cursor (max 10px)
  - Uses mouse position relative to button center
  - Smooth spring animation
- Arrow icon animates on hover (slide right)
- Click: ripple effect
```

---

### Scroll Triggers (GSAP)

**About + Stats Split:**
```javascript
ScrollTrigger.create({
  trigger: ".about-section",
  start: "top 70%",
  onEnter: () => {
    // Left panel: x: -100 → 0, opacity: 0 → 1
    // Right panel: x: 100 → 0, opacity: 0 → 1
    // Stagger: 0.2s
  }
})
```

**Research Tracks (Horizontal Scroll):**
```javascript
// Pin container while scrolling
ScrollTrigger.create({
  trigger: ".tracks-section",
  pin: true,
  start: "top top",
  end: "+=3000", // Scroll distance
  scrub: 1
})

// Horizontal scroll animation
gsap.to(".tracks-container", {
  x: () => -(container.scrollWidth - window.innerWidth),
  scrollTrigger: {
    trigger: ".tracks-section",
    scrub: 1
  }
})

// Individual card animations (mix):
// Cards 1, 3, 5, 7: Flip animation
// Cards 2, 4, 6, 8: Scale + fade
```

**Speakers (Organic Layout):**
```javascript
// Stagger animation
gsap.from(".speaker-card", {
  y: 100,
  opacity: 0,
  rotation: (i) => i % 2 === 0 ? 5 : -5, // Alternate rotation
  stagger: 0.15,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".speakers-section",
    start: "top 60%"
  }
})
```

**Timeline (Progressive Reveal):**
```javascript
// Draw line
gsap.to(".timeline-line", {
  height: "100%",
  scrollTrigger: {
    trigger: ".timeline-section",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    pin: ".timeline-container"
  }
})

// Reveal events
events.forEach((event, i) => {
  ScrollTrigger.create({
    trigger: event,
    start: "top 70%",
    onEnter: () => {
      gsap.to(event, { opacity: 1, x: 0, duration: 0.6 })
    }
  })
})
```

---

## 🎴 Component Specifications

### Hero Network Background
```
Component: HeroNetwork.jsx
Tech: Three.js + React Three Fiber (optional)
Features:
- Canvas fills viewport (100vw × 100vh)
- Particles: BufferGeometry with Points
- Lines: LineSegments with BufferGeometry
- Mouse tracking: useRef + useFrame
- Responsive: useEffect for resize
```

### Countdown Timer
```
Component: CountdownTimer.jsx
Props: targetDate (Date)
Features:
- Calculate time difference every second
- Flip animation on digit change
- Format: "XX Days : XX Hrs : XX Min : XX Sec"
- Style: Monospace font, charcoal color
```

### Magnetic Button
```
Component: MagneticButton.jsx
Props: children, href, onClick
Features:
- Track mouse position relative to button
- Transform: translate(x, y) based on distance
- Max distance: 10-15px
- Spring animation (react-spring or Framer Motion)
- Reset on mouse leave
```

### Research Track Card
```
Component: TrackCard.jsx
Props: track (object), animationType ('flip' | 'scale')
Features:
- Two variants based on animationType
- Flip: CSS transform rotateY(0deg → 180deg)
- Scale: transform scale(0.95 → 1) + fade
- Trigger: ScrollTrigger when in view
- Hover: lift + shadow increase
```

### Speaker Card (Bento Grid)
```
Component: SpeakerCard.jsx
Props: speaker, size ('large' | 'medium')
Layout:
- Large: 2 columns width, portrait image
- Medium: 1 column width, square image
- Image: grayscale → color on hover
- Info overlay on hover
- Click: open modal (keep existing)
```

### Timeline Event
```
Component: TimelineEvent.jsx
Props: event (object), index
Features:
- Positioned along vertical line
- Circle indicator on line
- Event card to the right
- Fade + slide animation on reveal
- Different colors for event types
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Tablets */
md: 768px   /* Small laptops */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large */
```

### Mobile Adaptations
- Hero: Reduce font size, disable Three.js network (use static gradient)
- Stats: Stack vertically instead of horizontal
- Tracks: Vertical scroll instead of horizontal
- Speakers: 1 column grid, no organic positioning
- Timeline: Simpler layout, no pin
- Animations: Reduced motion, simpler effects

---

## 📋 Implementation Phases

### **Phase 1: Foundation & Cleanup** (2-3 hours)
- [ ] Remove dark mode (ThemeContext, ThemeToggle, all dark: classes)
- [ ] Remove red accent colors from Tailwind config
- [ ] Update color palette to monochrome
- [ ] Install new dependencies (Three.js, GSAP, fonts)
- [ ] Update typography (Archivo Black, Space Mono)
- [ ] Remove ConferenceBanner component
- [ ] Clean up unused imports

### **Phase 2: Hero Section** (4-5 hours)
- [ ] Create HeroNetwork.jsx (Three.js background)
- [ ] Build hero typography with split text animation
- [ ] Create CountdownTimer.jsx component
- [ ] Add stats bar with animated counters
- [ ] Create MagneticButton.jsx component
- [ ] Implement dual CTAs with magnetic effect
- [ ] Test responsiveness

### **Phase 3: About + Stats Section** (2 hours)
- [ ] Create AboutStatsSection.jsx
- [ ] Implement split layout (left: about, right: stats)
- [ ] Add GSAP scroll trigger for slide-in animations
- [ ] Add parallax effect on scroll
- [ ] Style stats cards with data visualization

### **Phase 4: Research Tracks** (3-4 hours)
- [ ] Create horizontal scroll container
- [ ] Build TrackCard.jsx with dual animation types
- [ ] Implement GSAP horizontal scroll + pin
- [ ] Add scroll indicators (arrows)
- [ ] Assign flip/scale animations alternately
- [ ] Test smooth horizontal scrolling

### **Phase 5: Speakers Section** (3 hours)
- [ ] Design Bento Grid layout (CSS Grid)
- [ ] Update SpeakerCard.jsx for size variants
- [ ] Position cards organically (varied sizes)
- [ ] Add GSAP stagger animation on scroll
- [ ] Implement hover effects (scale + shadow)
- [ ] Test modal functionality

### **Phase 6: Timeline Section** (3 hours)
- [ ] Create TimelineSection.jsx
- [ ] Build vertical line with progressive reveal
- [ ] Create TimelineEvent.jsx component
- [ ] Implement GSAP pin + scroll-based line draw
- [ ] Add event reveal animations
- [ ] Style different event types

### **Phase 7: CTA Section** (2 hours)
- [ ] Create CTASection.jsx
- [ ] Add morphing shapes background (SVG or CSS)
- [ ] Implement parallax effect
- [ ] Add bold typography
- [ ] Add dual CTAs with magnetic effect

### **Phase 8: Global Scroll & Polish** (3 hours)
- [ ] Integrate Locomotive Scroll (or stick with Lenis)
- [ ] Fine-tune all scroll triggers
- [ ] Add magnetic cursor globally (optional)
- [ ] Optimize Three.js performance
- [ ] Test all animations on different scroll speeds
- [ ] Add loading states

### **Phase 9: Responsive & Testing** (3 hours)
- [ ] Make all sections mobile responsive
- [ ] Disable heavy animations on mobile
- [ ] Test on tablets (iPad, Android tablets)
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Optimize images for web
- [ ] Run Lighthouse performance audit

### **Phase 10: Other Pages** (4-5 hours)
- [ ] Update About page with new design system
- [ ] Update Speakers page (full grid view)
- [ ] Update Call for Papers page
- [ ] Update Schedule page
- [ ] Update Registration page
- [ ] Update Committee page
- [ ] Update Gallery page
- [ ] Update Contact page

---

## 🎯 Success Metrics

### Performance
- Lighthouse score: 90+ (Performance, Accessibility, Best Practices)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Smooth 60fps animations on desktop
- 30fps minimum on mobile

### Design
- Unique, non-generic layout ✓
- Impactful hero section ✓
- Smooth scroll experience ✓
- Premium feel ✓
- Modern UI components ✓

### User Experience
- Clear information hierarchy
- Intuitive navigation
- Accessible keyboard navigation
- Readable typography
- Fast load times

---

## 📚 Resources & References

### Fonts (Google Fonts)
- Archivo Black: https://fonts.google.com/specimen/Archivo+Black
- Inter: https://fonts.google.com/specimen/Inter
- Space Mono: https://fonts.google.com/specimen/Space+Mono

### Libraries Documentation
- Three.js: https://threejs.org/docs/
- GSAP ScrollTrigger: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- Locomotive Scroll: https://github.com/locomotivemtl/locomotive-scroll
- Framer Motion: https://www.framer.com/motion/

### Design Inspiration
- Lenis: https://lenis.darkroom.engineering/
- Apple iPhone: https://www.apple.com/iphone-17/
- Awwwards: https://www.awwwards.com/

---

## 🚀 Getting Started

1. **Backup current code:**
   ```bash
   git add .
   git commit -m "Backup before redesign"
   git branch redesign-backup
   ```

2. **Create new branch:**
   ```bash
   git checkout -b monochrome-redesign
   ```

3. **Install dependencies:**
   ```bash
   npm install three @react-three/fiber @react-three/drei gsap @gsap/react locomotive-scroll
   ```

4. **Update fonts in index.html:**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
   ```

5. **Begin Phase 1: Foundation & Cleanup**

---

## ✅ Ready to Start?

All design decisions are documented. Implementation plan is complete.

**Estimated Total Time:** 30-35 hours
**Suggested Timeline:** 5-7 days (assuming 5-6 hours per day)

Let me know when you're ready to begin! 🚀
