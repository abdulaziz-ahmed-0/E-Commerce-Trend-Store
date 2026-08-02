import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, UserPlus, User, Mail } from "lucide-react";

const SignUpPage = () => {
  const { signup, loading, error, setError, user } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await signup(username, email, password);
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
          <p className="text-muted small mt-1 mb-0">Create a new account</p>
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
                placeholder="Choose a username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold small">
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <Mail size={16} className="text-muted" />
              </span>
              <input
                type="email"
                className="form-control border-start-0 ps-0"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
                minLength="6"
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
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              />
            ) : (
              <>
                <UserPlus size={18} /> Sign Up
              </>
            )}
          </button>
        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-blue fw-semibold text-decoration-none"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
