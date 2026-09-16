# Alpine Star - UI handoff
## Composition
Cinematic editorial landing page: full-width alpine photography, calm ivory, deep forest typography, sparing orange actions. Max-width 1320px, desktop gutters 56-72px; mobile 22-24px.
1. Header: horizontal wordmark; The app, Built for the mountain, Our approach anchors; waitlist CTA. Mobile retain logo and compact CTA.
2. Hero: 660-760px tall desktop landscape, naturally dark negative space for ivory copy and unobscured summit. Serif headline 84-112px / line-height .98. Eyebrow, short supporting copy, orange CTA, Explore the app anchor, expedition caption. If photograph lacks negative space, use a solid text panel or heading above image. Never apply full-bleed dark scrim or obscure focal subjects.
3. Narrow promise strip: Prepared for the extraordinary. Route. Prepare. Explore.
4. Product section: 100-120px vertical spacing, two columns. Copy with large serif heading and numbered features; large phone on pale sage contour field. Mobile copy then phone.
5. Expedition section: wide climber photo paired with forest panel. Five capabilities in concise rows or tabs, not identical card grid.
6. Closing invitation, placeholder CTA, Coming soon label; compact branded footer, concept descriptor, copyright. No fake reviews.

## Phone concept
Approximately 300 x 600px desktop, max-width 78vw mobile, forest shell, 42px corners, small camera island. Mont Blanc / Your next objective header. Pale topographic SVG map with contours, glacier shapes, orange route, start/summit pins, mountain label, zoom/layer controls. Weather chip and bottom route sheet with elevation, distance, estimated time and View route button. Familiar navigation conventions without Google branding. Nearby label: Illustrative app preview. Sample risk and oxygen availability clearly illustrative; no fake real-time status.

## Design tokens and behavior
Brand palette from step 1. Forest on ivory body copy, dark text on orange buttons. Serif section headings 44-64px desktop / 36-42px mobile; body 16-18px at 1.55 line height; uppercase 11-12px labels with .14em tracking. Copy <=62ch. Spacing 4,8,12,16,24,32,48,64,96,120px. Thin sage borders, subtle website corner radii.
Buttons minimum 44px target and 52px primary height, visible focus, 150ms hover. Placeholder waitlist can open an accessible informational dialog saying signups are coming soon; do not collect data or claim success. Real section anchors, labeled map demonstration controls.

## Responsive/accessibility/QA
Mobile <640px, tablet 640-1023px, desktop >=1024px. Stack columns, use fluid heading sizing, preserve image focal positions, no 320px overflow. Semantic headings/nav, alt text, labeled controls, keyboard dialog with Escape close and focus return, reduced motion support. Contrast >=4.5:1 body / >=3:1 large text. Optimize photography as WebP, hero eager and lower images lazy. Inspect desktop and 390px mobile, plus 200% text zoom. Concept content must stay honest and legible.

