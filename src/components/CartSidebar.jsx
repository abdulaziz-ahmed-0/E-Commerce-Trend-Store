import React from "react";
import { useNavigate } from "react-router-dom"; // 1. استيراد useNavigate
import { useCart } from "../context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();
  const navigate = useNavigate(); // 2. تعريف navigate

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => setIsCartOpen(false)}
          style={{ zIndex: 1040 }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`offcanvas offcanvas-end ${isCartOpen ? "show" : ""}`}
        tabIndex="-1"
        style={{ zIndex: 1045, visibility: isCartOpen ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold d-flex align-items-center gap-2">
            <ShoppingBag size={20} className="text-primary-blue" />
            Your Cart ({cartItems.length})
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column p-0">
          {cartItems.length === 0 ? (
            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted p-4">
              <ShoppingBag size={48} className="mb-3 opacity-50" />
              <p className="fs-5">Your cart is empty.</p>
              <button
                className="btn btn-outline-primary mt-3 rounded-pill px-4"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow-1 overflow-auto p-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex gap-3 mb-4 bg-white p-2 border rounded shadow-sm"
                  >
                    <img
                      src={item.thumbnail || item.images?.[0]}
                      alt={item.title}
                      className="rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                        backgroundColor: "#f8f9fa",
                      }}
                    />
                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6
                          className="fw-bold mb-1 text-truncate"
                          style={{ maxWidth: "180px" }}
                        >
                          {item.title}
                        </h6>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="text-primary-blue fw-bold mb-2">
                        {item.price} $
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary py-0 px-2"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="fw-medium px-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary py-0 px-2"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-top p-3 bg-light mt-auto">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bold fs-5">Total:</span>
                  <span className="fw-bold fs-4 text-primary-blue">
                    {getCartTotal().toFixed(2)} $
                  </span>
                </div>
                <button
                  className="btn btn-primary-custom w-100 rounded-pill py-2 fw-bold fs-5"
                  onClick={() => {
                    setIsCartOpen(false); 
                    navigate("/checkout"); 
                  }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
