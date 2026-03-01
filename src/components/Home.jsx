import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "./custom-hook/useFetch";
import { LifeLine } from "react-loading-indicators";

const Home = () => {
  const navigate = useNavigate();

  const { products, isLoading } = useFetch("http://localhost:5000/products");

  const featuredProducts = products.slice(0, 4);

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* ================= HERO ================= */}
      <div
        style={{
          backgroundColor: "#fff0f6",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#6a0dad",
            fontWeight: "bold",
            fontSize: "48px",
          }}
        >
          Welcome to Purplle Store
        </h1>

        <p style={{ fontSize: "18px", color: "#555" }}>
          Discover Beauty & Fashion Essentials
        </p>

        <Button
          size="lg"
          style={{
            backgroundColor: "#ff3399",
            border: "none",
          }}
          onClick={() => navigate("/Product")}
        >
          Shop Now
        </Button>
      </div>

      {/* ================= FEATURES ================= */}
      
      <div
        style={{
          backgroundColor: "#f7f0fb",
          padding: "60px 0",
          marginTop: "60px",
        }}
      >
        <Container>
          <h2
            className="text-center mb-5"
            style={{
              color: "#6a1b9a",
              fontWeight: "bold",
            }}
          >
            Why Shop With Purplle Store?
          </h2>

          <Row className="text-center g-4">
            <Col md={3}>
              <div className="p-4 bg-white shadow-sm rounded">
                <div style={{ fontSize: "40px" }}>🚚</div>
                <h5 className="mt-3">Fast Delivery</h5>
                <p className="text-muted">Lightning fast doorstep delivery</p>
              </div>
            </Col>

            <Col md={3}>
              <div className="p-4 bg-white shadow-sm rounded">
                <div style={{ fontSize: "40px" }}>💳</div>
                <h5 className="mt-3">Secure Payment</h5>
                <p className="text-muted">Safe & encrypted transactions</p>
              </div>
            </Col>

            <Col md={3}>
              <div className="p-4 bg-white shadow-sm rounded">
                <div style={{ fontSize: "40px" }}>⭐</div>
                <h5 className="mt-3">Top Quality</h5>
                <p className="text-muted">Premium verified products</p>
              </div>
            </Col>

            <Col md={3}>
              <div className="p-4 bg-white shadow-sm rounded">
                <div style={{ fontSize: "40px" }}>🎁</div>
                <h5 className="mt-3">Best Offers</h5>
                <p className="text-muted">Exclusive deals & discounts</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ================= TRENDING PRODUCTS ================= */}
      <Container className="mt-5 mb-5">
        <h2 className="text-center mb-4" style={{ color: "#6a0dad" }}>
          Trending Products
        </h2>

        {isLoading ? (
          <center>
            <LifeLine color="#ff3399" size="large" />
          </center>
        ) : (
          <Row className="g-4">
            {featuredProducts.map((product) => (
              <Col key={product.id} md={3} sm={6}>
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Card.Img
                    src={product.image}
                    style={{
                      height: "220px",
                      objectFit: "contain",
                      padding: "15px",
                    }}
                  />

                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>

                    <Card.Text
                      style={{
                        color: "#ff3399",
                        fontWeight: "bold",
                      }}
                    >
                      ₹ {product.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
