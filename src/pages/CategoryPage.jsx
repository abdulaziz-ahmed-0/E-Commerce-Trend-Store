import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Loader, ArrowLeft, SlidersHorizontal } from "lucide-react";

const CATEGORY_MAP = {
  "mens-shoes": { apiSlug: "mens-shoes", label: "Men's Shoes" },
  "mens-shirts": { apiSlug: "mens-shirts", label: "Men's Shirts" },
  "mens-watches": { apiSlug: "mens-watches", label: "Men's Watches" },
  all: { apiSlug: null, label: "All Products" },
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [minRating, setMinRating] = useState(0);

  const categoryInfo = CATEGORY_MAP[slug] || { label: slug, apiSlug: slug };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSortBy("default");
    setMinRating(0);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data = [];
        if (!categoryInfo.apiSlug) {
          const responses = await Promise.all([
            axios.get("https://dummyjson.com/products/category/mens-shoes"),
            axios.get("https://dummyjson.com/products/category/mens-shirts"),
            axios.get("https://dummyjson.com/products/category/mens-watches"),
          ]);
          data = responses.flatMap((r) => r.data.products);
        } else {
          const res = await axios.get(
            `https://dummyjson.com/products/category/${categoryInfo.apiSlug}?limit=30`,
          );
          data = res.data.products;
        }
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug, categoryInfo.apiSlug]);

  const displayedProducts = useMemo(() => {
    let filtered = products.filter((p) => p.rating >= minRating);

    if (sortBy === "price-asc")
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc")
      return [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === "rating-desc")
      return [...filtered].sort((a, b) => b.rating - a.rating);
    if (sortBy === "discount")
      return [...filtered].sort(
        (a, b) => b.discountPercentage - a.discountPercentage,
      );

    return filtered;
  }, [products, sortBy, minRating]);

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-primary-blue">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold">
            {categoryInfo.label}
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">{categoryInfo.label}</h2>
          {!loading && (
            <p className="text-muted mb-0 small">
              {displayedProducts.length} products found
            </p>
          )}
        </div>

        {!loading && (
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <SlidersHorizontal size={16} className="text-muted" />

            <select
              className="form-select form-select-sm rounded-pill border"
              style={{ width: "auto" }}
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              <option value={0}>All Ratings</option>
              <option value={4}>⭐ 4+ Stars</option>
              <option value={4.5}>⭐ 4.5+ Stars</option>
            </select>

            <select
              className="form-select form-select-sm rounded-pill border"
              style={{ width: "auto" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating-desc">Best Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>

            <Link
              to="/"
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 rounded-pill px-3"
            >
              <ArrowLeft size={14} /> Home
            </Link>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center py-5">
          <Loader
            className="text-primary-blue"
            size={48}
            style={{ animation: "spin 2s linear infinite" }}
          />
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!loading && displayedProducts.length > 0 && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {displayedProducts.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {!loading && displayedProducts.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">No products match your filters.</p>
          <button
            className="btn btn-primary-custom rounded-pill px-4 mt-2"
            onClick={() => {
              setSortBy("default");
              setMinRating(0);
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
