# SMART TOUR 3D: Immersive Property Marketing System

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r163-black.svg)](https://threejs.org/)
[![Remotion](https://img.shields.io/badge/Remotion-Video-purple.svg)](https://www.remotion.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A high-performance 3D real estate visualization system. It offers a seamless transition between **interactive web roaming** and **programmatically generated cinematic videos**, providing a futuristic solution for real estate digital twins.

## 📺 Video Showcase

![Smart Tour 3D Preview](./public/videos/3D-SmartTour-Showcase.gif)
> *Note: Programmatically rendered using Remotion at 4K/60fps.*

---

## 🌟 Core Features

### 1. Interactive 3D Roaming (Web)
*   **Game-like Exploration**: First-person perspective with WASD controls and physics-based collision (Rapier).
*   **Dynamic Environments**: Real-time Day/Night switching with photorealistic lighting adjustments.
*   **Interactive Hotspots**: Clickable furniture/objects with metadata (Price, Description) powered by Zustand.
*   **Cross-Platform Performance**: Tier-based renderer detection (WebGL2/WebGPU) to ensure 60FPS on both Mobile and Desktop.

### 2. Programmatic Video Production (Remotion)
*   **Guided Tour Rendering**: Turn 3D navigation points into professional 4K/60fps marketing videos.
*   **Cinematic Camera**: Smooth step interpolation (Lerp) for movie-quality camera movement.
*   **Dynamic Overlays**: Real-time HUD and location labels that sync perfectly with the 3D space during rendering.
*   **One-Click Export**: Generate optimized MP4 showcases directly from code.

### 3. Developer Tools
*   **Guided Tour Debugger**: Visual tools to record and test camera coordinates in real-time.
*   **Performance Monitor**: Integrated FPS and memory tracking for scene optimization.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Engine** | Three.js / React Three Fiber (R3F) |
| **Video** | Remotion |
| **Physics** | @react-three/rapier |
| **State** | Zustand |
| **Styling** | TailwindCSS |
| **Testing** | Vitest / Playwright |

---

## 🚀 Quick Start

### Installation
```bash
npm install
```

### 💻 Running the App (Interactive Mode)
```bash
npm run dev
```

### 🎬 Rendering Video (Remotion Mode)
*   **Preview**: `npm run video` (Opens Remotion Studio)
*   **Render MP4**: `npm run video:render` (Exports to `out/3D-SmartTour-Showcase.mp4`)

---

## 📁 Project Structure

```text
src/
├── components/3d/    # 3D Elements (Player, House, Lighting)
├── components/ui/    # HUD & Control Panels
├── remotion/         # Video Rendering Logic & Compositions
├── data/             # Tour Points & Scene Configurations
└── hooks/            # Scene State & Keyboard Logic
```

---

## 🔮 Future Vision
This project is part of a larger Digital Twin initiative for Wellington and Auckland real estate, aiming to replace traditional static imagery with fully interactive, AI-optimized virtual environments.

---

## ⚖️ License
MIT
