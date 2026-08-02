import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-top py-5 mt-5">
      <div className="container">
        <div className="row gy-4">

          {/* Platform Info Section */}
          <div className="col-12 col-md-6">
            <span className="fw-bold text-primary-blue fs-5 d-block mb-3">Trend Store</span>
            <p className="text-muted small mb-0 pe-md-5">
              Your ultimate destination for the latest fashion trends. We are dedicated to providing top-quality products at the best prices to meet your everyday needs.
            </p>
          </div>

          {/* Contact & Address Section */}
          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3 text-dark">Contact Us</h6>
            <div className="text-muted small d-flex flex-column gap-2">
              <span>📍 Dakahlia, Egypt</span>
              <span>📧 support@trendstore.com</span>
              <span>📞 +20 123 456 7890</span>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3 text-dark">Follow Us</h6>
            <div className="d-flex flex-column gap-2 small text-muted">
              <span style={{ cursor: 'pointer' }}>Facebook</span>
              <span style={{ cursor: 'pointer' }}>Instagram</span>
              <span style={{ cursor: 'pointer' }}>Tiktok</span>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <hr className="mt-4 mb-3 text-muted" />
        <div className="text-center text-muted small">
          © 2026 Trend Store. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
