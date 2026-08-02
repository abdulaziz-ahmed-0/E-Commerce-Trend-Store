import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Search, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import "../pages/LoginPage";

const Navbar = () => {
  const { getCartCount, setIsCartOpen } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary-blue fs-3" to="/">
          Trend Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-medium">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category/all">
                All Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category/mens-shoes">
                Shoes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category/mens-shirts">
                Shirts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category/mens-watches">
                Watches
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3 ms-lg-4">
            <NavLink
              className="text-secondary"
              style={{ cursor: "pointer" }}
              to="/Login"
            >
              <User />
            </NavLink>
            <div
              className="position-relative"
              style={{ cursor: "pointer" }}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="text-secondary hover-primary transition-colors" />
              {getCartCount() > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.65rem" }}
                >
                  {getCartCount()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
