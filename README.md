# 🚀 Vaishnavi Dubey — Personal Portfolio

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/Vaishnavi-Dubey/vaishnavi-portfolio.svg?style=for-the-badge)](https://github.com/Vaishnavi-Dubey/vaishnavi-portfolio/stargazers)

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

</div>

> A visually stunning, interactive personal portfolio built with **React 19**, **Three.js** (React Three Fiber), and **Framer Motion** — featuring 3D canvas animations, smooth scrolling, and a custom cursor experience.

---

## ✨ Key Features

- 🎨 **3D Interactive Canvas** — Immersive Three.js scenes powered by React Three Fiber + Drei
- ✨ **Smooth Animations** — Framer Motion transitions for fluid page interactions
- 🖱️ **Custom Cursor** — Bespoke cursor component for a premium UX feel
- 📜 **Smooth Scrolling** — Lenis-powered buttery scroll experience
- 📱 **Responsive Design** — Optimized for all screen sizes
- 🎯 **Section-Based Layout** — Hero, About, Skills, Experience, Education, Projects, Achievements, Contact
- ⚡ **Blazing Fast** — Vite-powered build for sub-second hot reloads
- 🛡️ **Error Boundaries** — Graceful error handling for 3D rendering edge cases

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **3D Rendering** | Three.js, @react-three/fiber, @react-three/drei |
| **Animations** | Framer Motion |
| **Smooth Scroll** | Lenis |
| **Icons** | Lucide React |
| **Styling** | SASS/SCSS |
| **Build Tool** | Vite 7 |
| **Linting** | ESLint |

---

## 🏗️ Architecture / How It Works

```
┌───────────────────────────────────────────────────┐
│                 App.jsx (Root)                    │
│  ┌─────────────┐  ┌───────────────────────────┐  │
│  │ Navbar      │  │ Cursor (custom)           │  │
│  └─────────────┘  └───────────────────────────┘  │
│  ┌───────────────────────────────────────────┐    │
│  │            Lenis Smooth Scroll            │    │
│  │  ┌──────┐ ┌───────┐ ┌────────┐ ┌──────┐  │    │
│  │  │ Hero │ │ About │ │ Skills │ │ Exp  │  │    │
│  │  └──────┘ └───────┘ └────────┘ └──────┘  │    │
│  │  ┌──────┐ ┌──────────┐ ┌──────────────┐  │    │
│  │  │ Edu  │ │ Projects │ │ Achievements │  │    │
│  │  └──────┘ └──────────┘ └──────────────┘  │    │
│  │  ┌─────────┐                              │    │
│  │  │ Contact │                              │    │
│  │  └─────────┘                              │    │
│  └───────────────────────────────────────────┘    │
│  ┌───────────────────────────────────────────┐    │
│  │         Canvas (3D Scenes)                │    │
│  │         React Three Fiber + Drei          │    │
│  └───────────────────────────────────────────┘    │
└───────────────────────────────────────────────────┘
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Vaishnavi-Dubey/vaishnavi-portfolio.git
cd vaishnavi-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
# Portfolio available at http://localhost:5173
```

---

## ▶️ Usage

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## 📂 Project Structure

```
vaishnavi-portfolio/
├── public/                     # Static assets
├── src/
│   ├── main.jsx                # App entry point
│   ├── App.jsx                 # Root component with layout
│   ├── App.css                 # Global styles
│   ├── index.css               # Base CSS reset
│   ├── canvas/                 # Three.js 3D scene components
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Cursor.jsx          # Custom cursor component
│   │   └── ErrorBoundary.jsx   # Error handling wrapper
│   ├── sections/
│   │   ├── Hero.jsx            # Landing hero section
│   │   ├── About.jsx           # About me section
│   │   ├── Skills.jsx          # Technical skills showcase
│   │   ├── Experience.jsx      # Work experience timeline
│   │   ├── Education.jsx       # Education background
│   │   ├── Projects.jsx        # Project showcase gallery
│   │   ├── Achievements.jsx    # Awards and certifications
│   │   └── Contact.jsx         # Contact form and links
│   └── assets/                 # Images and media
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── Vaishnavi_Dubey_Resume.pdf  # Downloadable resume
└── package.json
```

---

## 📸 Screenshots / Demo

> Live demo and screenshots coming soon!

---

## 📈 Impact / Learning / Highlights

- 🎨 **3D Web Experience** — Three.js integration creates an immersive, memorable portfolio
- ⚡ **React 19** — Built with the latest React features for optimal performance
- 🖱️ **Premium UX Details** — Custom cursor, Lenis smooth scroll, and Framer Motion animations
- 📱 **Fully Responsive** — Adapts seamlessly from mobile to ultra-wide displays
- 🛡️ **Production-Ready** — Error boundaries, ESLint, and optimized Vite build

---

## 🤝 Contributing

Contributions are welcome! Feel free to suggest design improvements or new sections.

---

## 📜 License

This project is licensed under the **MIT License**.

---

<p align="center">
  <b>Built with ❤️ by <a href="https://github.com/Vaishnavi-Dubey">Vaishnavi Dubey</a></b>
</p>
