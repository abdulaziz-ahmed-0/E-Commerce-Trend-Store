import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { ChevronRight, Loader } from "lucide-react";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["all", "mens-shoes", "mens-shirts", "mens-watches"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all([
          axios.get("https://dummyjson.com/products/category/mens-shoes"),
          axios.get("https://dummyjson.com/products/category/mens-shirts"),
          axios.get("https://dummyjson.com/products/category/mens-watches"),
        ]);

        const allProducts = responses.flatMap((res) => res.data.products);
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className="container mt-4 mb-5">
        <div
          id="heroCarousel"
          className="carousel slide rounded-4 overflow-hidden shadow-lg"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner" style={{ maxHeight: "500px" }}>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1200"
                className="d-block w-100"
                alt="Slide 1"
                style={{ objectFit: "cover", height: "500px" }}
              />
              <div
                className="carousel-caption d-none d-md-block p-4 mb-4"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
              >
                <h3 className="fw-bold text-white">
                  Latest Men's Shoes Trends
                </h3>
                <p className="text-light mb-4">
                  Discover our new collection of sneakers, classic shoes, and
                  accessories with top quality and best prices.
                </p>
                <button
                  className="btn btn-light btn-md px-4 d-inline-flex align-items-center gap-2"
                  onClick={() => (window.location.href = "/category/all")}
                >
                  Shop Now
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200"
                className="d-block w-100"
                alt="Slide 2"
                style={{ objectFit: "cover", height: "500px" }}
              />
              <div
                className="carousel-caption d-none d-md-block p-4 mb-4"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
              >
                <h3 className="fw-bold text-white">Classic Shoes Collection</h3>
                <p className="text-light mb-4">
                  Unmatched elegance for all your occasions.
                </p>
                <button
                  className="btn btn-light btn-md px-4 d-inline-flex align-items-center gap-2"
                  onClick={() => (window.location.href = "/category/all")}
                >
                  Shop Now
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200"
                className="d-block w-100"
                alt="Slide 3"
                style={{ objectFit: "cover", height: "500px" }}
              />
              <div
                className="carousel-caption d-none d-md-block p-4 mb-4"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
              >
                <h3 className="fw-bold text-white">Shoe Care Starts Here</h3>
                <p className="text-light mb-4">
                  Care and comfort accessories for your feet.
                </p>
                <button
                  className="btn btn-light btn-md px-4 d-inline-flex align-items-center gap-2"
                  onClick={() => (window.location.href = "/category/all")}
                >
                  Shop Now
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <section className="container mb-5">
        <div className="d-flex align-items-end mb-4 justify-content-start">
          <h2 className="fw-bold m-0">Featured Products</h2>
        </div>

        <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
          {categories.map((category) => (
            <span
              key={category}
              className={`badge rounded-pill px-4 py-2 border category-pill ${activeCategory === category ? "active" : "text-dark bg-white"}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "all" ? "All" : category}
            </span>
          ))}
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

        {!loading && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.map((product) => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
