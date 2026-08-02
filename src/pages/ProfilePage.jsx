import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import {
  LogOut,
  Heart,
  ShoppingBag,
  User,
  Camera,
  Edit2,
  Save,
} from "lucide-react";
import ProductCard from "../components/ProductCard";

const ProfilePage = () => {

  const { user, logout, updateProfile, loading } = useAuth();
  const { wishlist } = useWishlist();
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();


  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    image: user?.image || null,
  });
  const fileInputRef = useRef(null);

  if (!user) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
        <User size={64} className="text-muted mb-3 opacity-50" />
        <h4 className="fw-bold mb-2">You're not signed in</h4>
        <p className="text-muted">
          Sign in to view your profile, wishlist, and orders.
        </p>
        <Link
          to="/login"
          className="btn btn-primary-custom rounded-pill px-5 py-2 fw-bold"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const success = await updateProfile(editData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      username: user.username,
      email: user.email,
      image: user.image,
    });
  };

  return (
    <div className="container py-5">

      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 d-flex flex-column flex-md-row align-items-center gap-4">

        <div className="position-relative">
          <div
            className="rounded-circle bg-light d-flex align-items-center justify-content-center overflow-hidden shadow-sm border"
            style={{ width: 100, height: 100 }}
          >
            {(isEditing ? editData.image : user.image) ? (
              <img
                src={isEditing ? editData.image : user.image}
                alt="Profile Avatar"
                className="w-100 h-100 object-fit-cover"
              />
            ) : (
              <User size={40} className="text-secondary" />
            )}
          </div>

          {isEditing && (
            <button
              className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 p-2 shadow"
              onClick={() => fileInputRef.current.click()}
              title="Change Photo"
            >
              <Camera size={14} />
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="d-none"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex-grow-1 w-100">
          {isEditing ? (
            <div
              className="d-flex flex-column gap-2"
              style={{ maxWidth: "300px" }}
            >
              <input
                type="text"
                className="form-control"
                value={editData.username}
                onChange={(e) =>
                  setEditData({ ...editData, username: e.target.value })
                }
                placeholder="Username"
              />
              <input
                type="email"
                className="form-control"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                placeholder="Email Address"
              />
            </div>
          ) : (
            <>
              <h3 className="fw-bold mb-1">
                {user.firstName
                  ? `${user.firstName} ${user.lastName || ""}`
                  : user.username}
              </h3>
              <p className="text-muted mb-0">@{user.username}</p>
              {user.email && (
                <p className="text-muted small mb-0">{user.email}</p>
              )}
            </>
          )}
        </div>

        <div className="d-flex gap-2 flex-column flex-md-row">
          {isEditing ? (
            <>
              <button
                className="btn btn-success rounded-pill px-4 d-flex align-items-center justify-content-center gap-2"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  <>
                    <Save size={16} /> Save
                  </>
                )}
              </button>
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary-custom rounded-pill px-4 d-flex align-items-center justify-content-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={16} /> Edit Profile
              </button>
              <button
                className="btn btn-outline-danger rounded-pill px-4 d-flex align-items-center justify-content-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      <div className="row g-3 mb-5">
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <Heart size={24} className="text-danger mx-auto mb-2" />
            <h4 className="fw-bold mb-0 text-primary-blue">
              {wishlist.length}
            </h4>
            <p className="text-muted small mb-0">Wishlist Items</p>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <ShoppingBag size={24} className="text-primary-blue mx-auto mb-2" />
            <h4 className="fw-bold mb-0 text-primary-blue">
              {cartItems.length}
            </h4>
            <p className="text-muted small mb-0">Cart Items</p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <span className="fs-4 d-block mb-2">💰</span>
            <h4 className="fw-bold mb-0 text-primary-blue">
              ${getCartTotal().toFixed(0)}
            </h4>
            <p className="text-muted small mb-0">Cart Total</p>
          </div>
        </div>
      </div>
      
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <Heart size={20} className="text-danger" fill="currentColor" />
          My Wishlist
        </h4>
        <Link
          to="/wishlist"
          className="btn btn-outline-secondary btn-sm rounded-pill px-3"
        >
          View All
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-4 text-muted bg-light rounded-4">
          <Heart size={36} className="mb-2 opacity-25" />
          <p className="mb-0">
            Your wishlist is empty. Browse products and click ❤️ to save them!
          </p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {wishlist.slice(0, 4).map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;