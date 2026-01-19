# Design Guidelines: Papal Schism (Dark Medieval Choice Game)

## Brand Identity

**Purpose**: A morally uncomfortable, choice-driven narrative experience where players navigate corruption, war, and schism as Pope in medieval Europe.

**Aesthetic Direction**: **Brutally minimal with symbolic gravitas**
- Stark, essential UI that emphasizes the weight of each decision
- Medieval religious iconography meets modern brutalist design
- High contrast, austere, no decorative flourishes
- Every visual element serves the narrative tension

**Memorable Element**: The game visually TRANSFORMS based on your choices. Background atmospheres shift from holy gold coronations to blood-red war scenes to decaying famine blacks. Stats pulse red when declining. The UI itself judges you.

---

## Navigation Architecture

**Root Navigation**: Stack-only (linear narrative flow)

**Core Screens**:
1. **Title Screen** - Game start/continue
2. **Story Node Screen** - Main gameplay (dialogue + choices)
3. **Ending Summary Screen** - Final judgment

**Modals**:
- Stats Overlay (swipe up from bottom)
- Restart Confirmation

---

## Screen-by-Screen Specifications

### Title Screen
**Purpose**: Entry point, convey tone immediately

**Layout**:
- Full-screen dark gradient (deep burgundy to near-black)
- Centered papal cross icon (simple, stark)
- Game title in medieval serif
- Two large tap buttons: "Begin Papacy" / "Continue" (if save exists)
- Stats overlay trigger (small icon, top-right corner)

**Components**:
- Background: Radial gradient, subtle vignette
- Title text: Large, centered, gold on dark
- Buttons: Outlined rectangles, no fill, gold borders
- No header, no footer

### Story Node Screen (Main Gameplay)
**Purpose**: Present narrative, choices, consequences

**Layout**:
- **Dynamic background**: Changes based on `sceneVisual`
  - coronation: Warm gold radial gradient
  - council: Dim candlelit amber
  - war: Deep crimson with dark edges
  - famine: Desaturated browns/grays
  - scandal: Sickly green-black
  - schism: Split gradient (gold/blood-red vertical divide)
  - judgment: Pure black with subtle cross pattern
- **Scene icon**: Large, centered at top (emoji as specified in tech doc)
- **Dialogue area**: Center-screen, max-width 90%, readable line length
  - Tap anywhere on dialogue to advance
  - Fade-in/fade-out transitions between dialogue lines
- **Choice buttons**: When decision appears, 2-4 large buttons stack vertically
  - Occupy bottom 40% of screen
  - Large tap targets (min 60px height)
  - Visible consequences preview ("Gold -20, France +10") in smaller text below choice
- **Timed decisions**: Countdown timer (bold, top-center, pulsing when <3s)
- **Consequence overlay**: After choice, full-screen flash with text ("Rome will remember this"), fades after 1.5s

**Safe Area Insets**:
- Top: insets.top + 20px
- Bottom: insets.bottom + 20px
- Horizontal: 16px

**Components**:
- Background: Smooth gradient transitions (1s ease-in-out)
- Icon: 72x72px, centered, drop shadow
- Dialogue text: Readable, centered, fades between lines
- Choice buttons: Full-width minus padding, outlined style, no rounded corners
- Stat change indicators: Small badges that pulse when changed

### Ending Summary Screen
**Purpose**: Deliver final judgment based on stats/choices

**Layout**:
- Full-screen judgment background (⚖️ scene visual)
- Final stats displayed as vertical list (legitimacy, gold, piety, stability, curia)
- Relationship scores listed below
- Ending title (e.g., "The Corrupted Throne", "Saint Among Hypocrites")
- Ending paragraph (3-5 sentences)
- "Restart" button (large, centered, bottom)

**Components**:
- Stats: Left-aligned labels, right-aligned values, divider lines
- Ending text: Centered, readable
- Restart button: Outlined, gold on dark

### Stats Overlay (Modal)
**Purpose**: View current stats mid-game without disrupting flow

**Layout**:
- Slides up from bottom
- Semi-transparent dark background
- Stats grid (2 columns)
- Relationships list
- "Close" tap area (anywhere outside overlay)

**Components**:
- Overlay: 70% screen height, rounded top corners
- Stats: Label + progress bar + numeric value
- Relationships: Country name + bar (-100 to +100)

---

## Color Palette

**Primary**:
- Papal Gold: `#C9A961` (titles, accents, holy elements)
- Blood Crimson: `#8B0000` (war, danger, declining stats)

**Backgrounds** (scene-specific):
- Coronation: Radial `#C9A961` to `#8B5A00`
- Council: `#5C4033` to `#1A1A1A`
- War: `#8B0000` to `#0D0D0D`
- Famine: `#4A4A4A` to `#1A1A1A`
- Scandal: `#2F4F2F` to `#0A0A0A`
- Schism: Split vertical `#C9A961` | `#8B0000`
- Judgment: Pure `#000000`

**Text**:
- Primary: `#F5F5DC` (warm off-white, readable on dark)
- Secondary: `#A9A9A9` (de-emphasized text)
- Warning: `#FF4500` (timers, critical choices)

**UI Elements**:
- Button borders: `#C9A961`
- Stat bars (positive): `#C9A961`
- Stat bars (negative): `#8B0000`
- Overlay background: `rgba(0,0,0,0.85)`

---

## Typography

**Font**: System serif stack with fallback
- Primary: Georgia, 'Times New Roman', serif (medieval feel, readable)
- Secondary: -apple-system for stats/UI elements

**Type Scale**:
- Title: 32px, bold, letter-spacing 2px
- Dialogue: 18px, regular, line-height 1.6
- Choice buttons: 16px, medium, line-height 1.4
- Stat labels: 14px, regular
- Consequence text: 12px, italic

---

## Visual Design Principles

**Interaction Feedback**:
- All buttons: Darken 20% on press, instant
- Stat changes: Pulse effect (scale 1.0 → 1.1 → 1.0, red tint if negative)
- Scene transitions: 1s cross-fade
- Consequence overlay: Full-screen flash (opacity 0 → 0.9 → 0)

**Shadows**: NONE except scene icons (subtle drop shadow for readability)

**Icons**: Use specified emojis from tech doc (👑 🕯️ ⚔️ 🥀 🕳️ ☦️ ⚖️)

---

## Assets to Generate

**App Icons**:
- `icon.png` - Papal cross on dark burgundy circle (512x512) - App icon
- `splash-icon.png` - Same as icon - Splash screen

**UI Assets**:
- `papal-cross.svg` - Simple cross symbol - Title screen background element
- `overlay-pattern.png` - Subtle cross tessellation (tileable) - Judgment scene background

All visual requirements (scene backgrounds, icons) are generated via CSS/gradients and emojis as specified in technical doc.