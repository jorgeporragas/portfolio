# Jorge Porragas - Interactive Developer Portfolio

> A highly interactive, responsive personal website featuring a custom 3D CoverFlow engine, glassmorphism UI overlays, and complex fluid layouts.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://www.jorgeporragas.com)

## 🧠 Architecture & Engineering

This portfolio is not a static template. It was engineered from the ground up to showcase advanced frontend capabilities, specifically focusing on complex UI choreography, performance, and seamless responsive design without relying on heavy external carousel libraries.

### Key Technical Achievements:

* **Custom 3D CoverFlow Engine:** Built entirely with Framer Motion. Implements spring physics for drag gestures, dynamic 3D perspective (`translateZ`, `rotateY`), and offset-based index calculations.
* **Decoupled "Sibling" Component Architecture:** To solve traditional bounding-box and layout shift issues during drag interactions, the visual layer (the 3D disk stage) and the interactive UI layer (Project Overlay) are completely decoupled. They communicate via shared state, allowing extreme Z-index manipulation and perfect tap-to-dismiss behavior.
* **Mathematical Fluid Layouts:** Replaced rigid CSS Media Queries with native CSS `clamp()` and viewport units (`vw`, `vh`). This ensures the UI is mathematically proportional on any screen size, from my small iPhone SE to a crisp 4K desktop monitor.
* **Premium Glassmorphism & Z-Depth:** Utilizes deep CSS pseudo-elements to create intense, dynamic "blur trails" behind UI controls, ensuring perfect text readability over any dynamic image background while maintaining a strict `z-index` stacking context.

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animation Engine:** Framer Motion
* **Deployment:** Vercel

## 🚀 Local Development

1. Clone the repository:
```bash
git clone [https://github.com/jorgeporragas/portfolio.git](https://github.com/jorgeporragas/portfolio.git)
```

2. Install dependencies:
```bash
npm install
```
3. Run the deployment server:
```bash
npm run dev
```

## ⚖️ License & Copyright
### © 2026 Jorge Porragas. All Rights Reserved.

This repository is public for portfolio and demonstration purposes only. The source code, design, and assets may not be copied, cloned, distributed, or used for any commercial or personal projects without explicit permission.
