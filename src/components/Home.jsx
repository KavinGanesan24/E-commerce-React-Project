import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "./custom-hook/useFetch";
import { LifeLine } from "react-loading-indicators";
import { ChevronRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { products, isLoading } = useFetch("http://localhost:5000/products");
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.slice(0, 4));
    }
  }, [products]);

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* ================= HERO SECTION ================= */}
      <div
        style={{
          background: "linear-gradient(135deg, #6a0dad 0%, #ff3399 100%)",
          padding: "120px 20px",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "56px",
              marginBottom: "15px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Welcome to Purplle Store
          </h1>

          <p
            style={{
              fontSize: "20px",
              marginBottom: "30px",
              opacity: 0.95,
              fontWeight: "300",
            }}
          >
            Discover Premium Beauty & Fashion Essentials
          </p>

          <Button
            size="lg"
            style={{
              backgroundColor: "#ffffff",
              color: "#6a0dad",
              border: "none",
              fontWeight: "bold",
              padding: "12px 40px",
              fontSize: "16px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onClick={() => navigate("/Product")}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
          >
            Shop Now
          </Button>
        </div>
      </div>

      {/* ================= PROMO BANNER ================= */}
      <div
        style={{
          backgroundColor: "#fff0f6",
          padding: "20px",
          textAlign: "center",
          borderBottom: "2px solid #ff3399",
          marginTop: "-1px",
        }}
      >
        <p style={{ margin: 0, color: "#6a0dad", fontWeight: "500" }}>
          🎉 Free Shipping on Orders Above ₹500 | Use Code: PURPLLE20 for 20% Off
        </p>
      </div>

      {/* ================= FEATURES SECTION ================= */}
      <div
        style={{
          backgroundColor: "#f7f0fb",
          padding: "80px 0",
          marginTop: "40px",
        }}
      >
        <Container>
          <h2
            className="text-center mb-5"
            style={{
              color: "#6a0dad",
              fontWeight: "bold",
              fontSize: "36px",
            }}
          >
            Why Shop With Us?
          </h2>

          <Row className="g-4">
            {[
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Lightning fast doorstep delivery within 48 hours",
              },
              {
                icon: "💳",
                title: "Secure Payment",
                desc: "256-bit encrypted transactions with multiple payment options",
              },
              {
                icon: "⭐",
                title: "Premium Quality",
                desc: "100% verified and authentic products",
              },
              {
                icon: "🎁",
                title: "Exclusive Deals",
                desc: "Special offers and discounts for members",
              },
            ].map((feature, idx) => (
              <Col md={3} sm={6} key={idx}>
                <div
                  className="p-4 bg-white shadow-sm rounded"
                  style={{
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(106, 11, 173, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                    {feature.icon}
                  </div>
                  <h5 style={{ color: "#6a0dad", fontWeight: "bold" }}>
                    {feature.title}
                  </h5>
                  <p className="text-muted" style={{ fontSize: "14px" }}>
                    {feature.desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ================= CATEGORIES SECTION ================= */}
      <Container style={{ marginTop: "80px", marginBottom: "60px" }}>
        <h2
          className="text-center mb-4"
          style={{ color: "#6a0mad", fontWeight: "bold", fontSize: "32px" }}
        >
          Shop by Category
        </h2>

        <Row className="g-4 text-center">
          {[
            { name: "Beauty", emoji: "💄" },
            { name: "Fashion", emoji: "👗" },
            { name: "Skincare", emoji: "✨" },
            { name: "Accessories", emoji: "👜" },
          ].map((cat, idx) => (
            <Col md={3} sm={6} key={idx}>
              <div
                style={{
                  backgroundColor: "#f7f0fb",
                  padding: "40px 20px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  border: "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff0f6";
                  e.currentTarget.style.borderColor = "#ff3399";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f7f0fb";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => navigate("/Product")}
              >
                <div style={{ fontSize: "48px", marginBottom: "10px" }}>
                  {cat.emoji}
                </div>
                <h5 style={{ color: "#6a0bad" }}>{cat.name}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ================= TRENDING PRODUCTS ================= */}
      <div style={{ backgroundColor: "#f7f0fb", padding: "80px 0" }}>
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <h2 style={{ color: "#6a0bad", fontWeight: "bold", margin: 0 }}>
              Trending Products
            </h2>
            <Button
              variant="outline-primary"
              onClick={() => navigate("/Product")}
              style={{
                color: "#6a0bad",
                borderColor: "#6a0bad",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              View All <ChevronRight size={18} />
            </Button>
          </div>

          {isLoading ? (
            <center style={{ padding: "60px 0" }}>
              <LifeLine color="#ff3399" size="large" />
            </center>
          ) : featuredProducts.length > 0 ? (
            <Row className="g-4">
              {featuredProducts.map((product) => (
                <Col key={product.id} md={3} sm={6} xs={12}>
                  <Card
                    className="h-100 border-0"
                    style={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      overflow: "hidden",
                    }}
                    onClick={() => navigate(`/product/${product.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 24px rgba(255, 52, 153, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.08)";
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        backgroundColor: "#fff",
                        height: "250px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Card.Img
                        src={product.image}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          backgroundColor: "#ff3399",
                          color: "white",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        New
                      </div>
                    </div>

                    <Card.Body style={{ padding: "20px" }}>
                      <Card.Title
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#333",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.title}
                      </Card.Title>

                      <Card.Text
                        style={{
                          color: "#ff3399",
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginTop: "10px",
                          marginBottom: "15px",
                        }}
                      >
                        ₹{product.price}
                      </Card.Text>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={{
                          width: "100%",
                          borderColor: "#ff3399",
                          color: "#ff3399",
                          transition: "all 0.3s",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#ff3399";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#ff3399";
                        }}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "#999" }}>No products available</p>
            </div>
          )}
        </Container>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div
        style={{
          backgroundColor: "#6a0bad",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontWeight: "bold" }}>
          Join Our Community
        </h2>
        <p style={{ marginBottom: "30px", fontSize: "16px" }}>
          Subscribe to get exclusive offers and updates
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              padding: "12px 20px",
              borderRadius: "4px",
              border: "none",
              minWidth: "250px",
              fontSize: "14px",
            }}
          />
          <Button
            style={{
              backgroundColor: "#ff3399",
              border: "none",
              padding: "12px 30px",
              fontWeight: "bold",
            }}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
