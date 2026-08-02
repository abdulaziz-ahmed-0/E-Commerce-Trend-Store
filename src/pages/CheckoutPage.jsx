import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CheckCircle, CreditCard, Truck, ShieldCheck } from "lucide-react";

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0 && !success) {
      navigate("/");
    }
  }, [cartItems, navigate, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart(); 

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light text-center py-5">
        <CheckCircle size={80} className="text-success mb-4" />
        <h2 className="fw-bold mb-2">Payment Successful!</h2>
        <p className="text-muted fs-5 mb-4">
          Thank you for your purchase. Your order is being processed.
        </p>
        <div className="spinner-border text-primary-custom" role="status">
          <span className="visually-hidden">Redirecting...</span>
        </div>
        <p className="text-muted small mt-3">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Checkout</h2>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <Truck size={20} className="text-primary-blue" />
              Shipping Details
            </h4>
            <form id="checkout-form" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Abdelaziz Ahmed"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+1 234 567 890"
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="123 Street, City"
                    required
                  />
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <CreditCard size={20} className="text-primary-blue" />
                Payment Method
              </h4>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-semibold">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="**** **** **** ****"
                    maxLength="19"
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">CVV</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="***"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm rounded-4 p-4 position-sticky"
            style={{ top: "20px" }}
          >
            <h4 className="fw-bold mb-4">Order Summary</h4>

            <div className="d-flex flex-column gap-3 mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center small"
                >
                  <div
                    className="text-truncate pe-3"
                    style={{ maxWidth: "200px" }}
                  >
                    <span className="text-muted">{item.quantity}x</span>{" "}
                    {item.title}
                  </div>
                  <span className="fw-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold">${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Shipping</span>
              <span className="text-success fw-semibold">Free</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4 fs-5">
              <span className="fw-bold">Total</span>
              <span className="fw-bold text-primary-blue">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="btn btn-primary-custom w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <>Pay Now ${getCartTotal().toFixed(2)}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
