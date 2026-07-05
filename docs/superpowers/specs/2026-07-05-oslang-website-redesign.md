# Design Specification: OS-Lang Website Redesign

This document details the design specifications and styling tokens for the redesign of the OS-Lang documentation website. The goal of this redesign is to deliver a premium, modern, and developer-focused user interface by combining the layout principles and branding color scheme of **python.org** with a sleek **Flat-UI/Modern Web** aesthetic.

---

## 1. Core Theme & Design Tokens (CSS Variables)

We will customize the base CSS variables in `src/css/custom.css` to build our custom theme:

### Typography
*   **Headings & Body Text:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, sans-serif.
*   **Monospace & Code Blocks:** `JetBrains Mono`, `Fira Code`, `SFMono-Regular`, `Consolas`, monospace.

### Color Palette
The color scheme is derived from the classic Python logo colors combined with dark slate slate-blues and off-white cards:

| Token | CSS Variable Value | Description / Usage |
| :--- | :--- | :--- |
| **Dark Blue** | `--py-dark-blue: #1e2530` | Main background for the Navbar, Hero banner header, and footer. |
| **Python Blue** | `--py-blue: #3776ab` | Brand blue. Used for links, primary call-to-actions, and active underlines. |
| **Python Blue Hover** | `--py-blue-hover: #2f6592` | Accent hover state color for blue buttons and links. |
| **Python Yellow** | `--py-yellow: #ffd43b` | Brand gold/yellow. Used for primary badges, download button, and header bottom border. |
| **Python Yellow Hover**| `--py-yellow-hover: #ffe066`| Hover state color for the primary download button. |
| **Console Dark BG** | `--py-console-bg: #111827` | Background color for the tabbed interactive terminal window. |
| **Light BG** | `--bg-light: #f7fafc` | Main body background for content and features. |
| **Text Primary** | `--text-main: #2d3748` | Charcoal color for body copy to ensure high readability. |
| **Border Color** | `--border-color: #e2e8f0` | Standard border color for cards and panels. |

---

## 2. Layout & Key Components

### A. Navigation Bar
*   **Styling:** Deep dark-blue background (`#1e2530`), with a golden-yellow (`#ffd43b`) border at the bottom (`border-bottom: 3px solid var(--py-yellow)`).
*   **Navbar Title:** High-contrast white (`#ffffff`).
*   **Navbar Links:** Styled in light slate-gray (`#cbd5e1`). On hover, they transition to pure white (`#ffffff`) with a smooth golden underline.
*   **Active Item:** Highlighted in Python-yellow with a small border indicator.

### B. Two-Column Hero Header
*   **Layout:** Responsive flex/grid container. 
*   **Left Column (Tagline & Call to Actions):**
    *   Main Heading: `OS-Lang` in white (`#ffffff`) with bold monospace accents.
    *   Description: Clean, readable text introducing the language.
    *   **Buttons Grid:**
        *   *Download OS-Lang 1.0.0 Button:* Yellow background (`#ffd43b`), dark text, subtle drop shadow, scaling slightly (`1.02x`) on hover.
        *   *Documentation Button:* Python-blue background (`#3776ab`), white text, transitions to dark-blue on hover.
*   **Right Column (Tabbed Console Window):**
    *   **Window Frame:** Dark rounded card with a thin border and three macOS-style buttons (red, yellow, green) on the left of the header.
    *   **Tabs:** Two tabs styled as clickable file selectors:
        1.  `kernel.os` (Code editor tab displaying a snippet of raw interrupt context switching).
        2.  `output.log` (Shell simulator tab displaying a mock compilation and QEMU boot sequence).
    *   **Code Theme:** Standardized Dracula or monokai dark syntax highlighting, leveraging the custom yellow and blue CSS variables for keywords and symbols.

### C. Homepage Body & Features Grid
*   **Background:** Off-white background (`#f7fafc`) for clear separation from the hero banner.
*   **Cards:** Clean white cards with small drop shadows (`shadow-sm`) and thin borders (`border-gray-200`).
*   **Interactive Effects:** Moving cursor over a card shifts the card up by `4px`, transitions its border to a soft blue/yellow accent, and intensifies the shadow to feel alive.

### D. Footer
*   **Style:** Multi-column layout with links categorized under *Documentation*, *Resources*, and *Community*.
*   **Colors:** Deep dark-blue background (`#1e2530`) with light gray text elements (`#94a3b8`).

---

## 3. Implementation Steps

1.  **CSS Refactoring:** Update `src/css/custom.css` with the typography imports, modern design overrides, navbar customizations, card transitions, and button styles.
2.  **Homepage Content Updates:** Modify `src/pages/index.tsx` to implement the new layout structure, tabbed code terminal component, and interactive buttons.
3.  **Homepage Features Component:** Refactor `src/components/HomepageFeatures/index.tsx` to align with the new cards, colors, and layout guidelines.
4.  **Docusaurus Configuration:** Verify navbar layout and configurations in `docusaurus.config.ts`.
5.  **Local Testing:** Build and serve the site locally to verify responsiveness, layout spacing, visual alignment, and interactive tab switches.
