import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, LogIn, User } from "lucide-react";

const LoginPage = () => {
  const { login, loading, error, setError, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (user) navigate("/profile", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) navigate("/profile", { replace: true });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: 440, width: "100%" }}
      >
        <div className="text-center mb-4">
          <span className="fw-bold text-primary-blue fs-3">Trend Store</span>
          <p className="text-muted small mt-1 mb-0">
            Welcome Back! Sign in to your account
          </p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small rounded-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">Username</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <User size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small">Password</label>
            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                className="form-control border-end-0"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
              />
              <span
                className="input-group-text bg-light"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPass((p) => !p)}
              >
                {showPass ? (
                  <EyeOff size={16} className="text-muted" />
                ) : (
                  <Eye size={16} className="text-muted" />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary-custom w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              <>
                <LogIn size={18} /> Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary-blue fw-semibold text-decoration-none"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
