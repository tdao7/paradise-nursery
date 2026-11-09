# Paradise Nursery Shopping Application

A responsive houseplant shopping cart built with **React**, **Redux Toolkit**, **React-Redux**, and **Vite** for the IBM / Coursera **Developing Front-End Apps with React** final project.

## Project overview

Paradise Nursery is a fictional online plant shop where visitors can explore houseplants, see prices, and manage their shopping cart. The application demonstrates component composition, React hooks, Redux actions and reducers, event handling, and dynamic rendering.

## Features

- **Landing page:** brand name, company story, plant background image, and **Get Started** button.
- **Product page:** nine plants across three categories, with image, description, price, and Add to Cart button for each. The button becomes disabled after adding an item.
- **Navigation:** Home, Shop Plants, and Cart links; cart badge updates to reflect total quantity.
- **Shopping cart:** item name, thumbnail, unit price, line total, increment/decrement quantity, remove item, dynamically calculated total item count and overall cost.
- **Cart actions:** Continue Shopping returns to the product page; Checkout displays a Coming Soon message (payment processing is intentionally out of scope).
- Responsive layouts for desktop and mobile.

## Getting started

Prerequisites: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Visit the URL printed by Vite (typically `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

Run basic Redux reducer tests:

```bash
npm test
```

## Required source files for grading

| Question | Source file | Purpose |
| --- | --- | --- |
| 1 | `README.md` | Project title, description, and instructions |
| 2 | `src/AboutUs.jsx` | Paradise Nursery company information |
| 3 | `src/App.css` | Landing-page background image and styling |
| 4 | `src/App.jsx` | Landing page with company name and Get Started button |
| 5 | `src/CartSlice.jsx` | Redux `addItem`, `removeItem`, and `updateQuantity` reducers |
| 6 | `src/ProductList.jsx` | Categorized products and Add to Cart behavior |
| 7 | `src/CartItem.jsx` | Shopping cart and total cost calculations |

## Project structure

```text
paradise-nursery/
├── README.md
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── store.js
│   ├── App.jsx
│   ├── App.css
│   ├── AboutUs.jsx
│   ├── CartSlice.jsx
│   ├── ProductList.jsx
│   ├── CartItem.jsx
│   └── data/plants.js
└── tests/cart.test.js
```

## Notes

All plant names, descriptions, and prices are illustrative. Images are remotely loaded from Unsplash and require an internet connection. This project does not perform real checkouts or accept payments.
