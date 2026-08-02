# 🛍️ Trend Store - E-Commerce SPA

A fully responsive, feature-rich Front-End E-Commerce web application built with **React.js**. It provides a seamless shopping experience with a custom mock authentication system, cart management, and user profile handling.

🔗 **Live Demo:** [Trend Store on Vercel](https://e-commerce-trend-store.vercel.app/)

---

## ✨ Features

* **Authentication System:** Fully functional Mock Sign Up, Log In, and Log Out using `localStorage`.
* **User Profile:** Users can view and edit their profile details, including uploading a profile picture (saved as Base64).
* **Shopping Cart:** Add, remove, and update item quantities. Features an Offcanvas Cart Sidebar and dynamic total calculation.
* **Wishlist:** Save and manage favorite products.
* **Mock Checkout:** A realistic checkout form that processes the order and clears the cart upon success.
* **Responsive Design:** Mobile-first approach with a fully responsive layout and navigation bar.
* **Seamless Routing:** Built with `react-router-dom` including an automatic "Scroll to Top" behavior on page transitions.

---

## 🛠️ Technologies Used

* **Framework:** React.js (Vite / CRA)
* **Routing:** React Router DOM
* **State Management:** React Context API (AuthContext, CartContext, WishlistContext)
* **Styling:** CSS & Bootstrap 5
* **Icons:** Lucide React
* **Deployment:** Vercel

---

## 🚀 Getting Started (Run Locally)

To get a local copy up and running, follow these simple steps:

### 1. Clone the repository
```bash
git clone [https://github.com/YourUsername/ecommerce-trend-store.git](https://github.com/YourUsername/ecommerce-trend-store.git)
```

### 2. Navigate to the project directory
```bash
cd ecommerce-trend-store
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm run dev
```

---

## 📂 Folder Structure

```text
src/
├── components/       # Reusable components (Navbar, ProductCard, ScrollToTop, etc.)
├── context/          # React Context files for global state (Auth, Cart, Wishlist)
├── pages/            # Page components (Home, Profile, Checkout, Auth pages, etc.)
├── App.jsx           # Main application routing
└── main.jsx          # Entry point
```

---

## 💡 Notes
* This project is a **Front-End only** application. All user data, sessions, and cart items are persistently stored in the browser's `localStorage` to simulate a real database environment.

---
Developed with ❤️ by [ِAbdelaziz Ahmed]
