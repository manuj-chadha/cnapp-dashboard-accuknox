# CNAPP Dashboard – AccuKnox

A customizable cloud security dashboard where users can add, remove, and manage widgets across different categories.  
Built as a frontend trainee assignment to showcase skills in **React, Redux Toolkit, Tailwind CSS, and Framer Motion**.

---

## 🚀 Live Demo

🔗 [Deployed App on Vercel](https://cnapp-dashboard-accuknox.vercel.app)

---

## ✨ Features

- **Widget Management**: Add or remove widgets from categories dynamically.  
- **Create New Widgets**: Define widget name & description and attach them to categories.  
- **Persistent State**: Dashboard selections are preserved locally.  
- **Theme Toggle**: Switch between light and dark modes.  
- **Smooth Animations**: Framer Motion for transitions and modal/sidebar animations.  
- **Clean UI**: Tailwind CSS for modern and responsive design.  

---

## 🛠️ Tech Stack

**Frontend Framework**  
- React (with Vite for bundling & dev server)  

**State Management**  
- Redux Toolkit  

**Styling & UI**  
- Tailwind CSS  
- Lucide React (icons)  

**Animations**  
- Framer Motion  

---

## 📂 Project Structure
src/
├── components/ # Reusable UI (widgets, modals, headers, etc.)
├── slices/ # Redux slices (dashboard state, widget/category logic)
├── pages/ # Dashboard page(s)
├── assets/ # Static assets
├── App.jsx
└── main.jsx


---

## ⚡ Getting Started
### Prerequisites
- Node.js (>= 18.x)  
- npm or yarn  

### Installation
```bash
# Clone the repository
git clone https://github.com/manuj-chadha/cnapp-dashboard-accuknox.git

# Navigate to the project directory
cd cnapp-dashboard-accuknox

# Install dependencies
npm install

# Start the development server
npm run dev
