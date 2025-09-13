# CNAPP Dashboard – AccuKnox (Frontend Trainee Assignment)

A dynamic dashboard app to manage, customize, and view widgets in different categories — built using React, Vite, Redux Toolkit, Tailwind CSS and Framer Motion. The project is a frontend assignment to create an interactive, modern dashboard with persistence, theme switching, and widget management features.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture & Folder Structure](#architecture--folder-structure)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [Future Improvements](#future-improvements)  
- [License](#license)  

---

## Features

Here are the core features implemented:

- **Widget management**: Add, remove, toggle widgets per category.  
- **Create new widgets**: Ability to define new widget name & description (or content) and add to a category.  
- **Persisted state**: Widget selections / categories persist (likely in local storage or Redux + local persistence) so UI persists between sessions.  
- **Dark mode / theme toggle**: Support for light/dark UI.  
- **Animations / transitions**: Using Framer Motion for smooth opening/closing of modals or modal-like UI.  
- **Responsive design**: Dashboard adapts to various screen sizes.  

---

## Tech Stack

Here’s the list of major technologies used:

| Layer | Technology / Library |
|---|---|
| Frontend framework | React (with Vite) |
| State management | Redux Toolkit |
| Styling / CSS | Tailwind CSS |
| Animation / transitions | Framer Motion |
| Icons | Lucide-React (and maybe others) |
| Build / Tooling | Vite, npm scripts |
| Persistence | (Your implementation: e.g. localStorage or Redux Persist) |

---

## Architecture & Folder Structure

Here’s what the structure looks like (approximate, based on repo):

