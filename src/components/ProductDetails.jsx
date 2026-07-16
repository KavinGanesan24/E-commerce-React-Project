import React from "react";
import { useParams } from "react-router-dom";
import { addItem } from "./store/cartSlice";
import { useDispatch } from "react-redux";
import useFetch from "./custom-hook/useFetch";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setBuyNowProduct } from "./store/buyNowSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const { products, isLoading } = useFetch(
    `https://e-commerce-react-project-adij.onrender.com/products/${id}`,
  );

  const product = products;

  if (isLoading || !product) {
    return <h3>Loading...</h3>;
  }

  return (
    <Container className="mt-5">
      {/* Back Button */}
      <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Row>
        {/* Product Image */}
        <Col md={6}>
          <Card>
            <Card.Img
              src={product.image}
              style={{
                height: "400px",
                objectFit: "contain",
                padding: "20px",
              }}
            />
          </Card>
        </Col>

        {/* Product Details */}
        <Col md={6}>
          <h2>{product.title}</h2>
          <h3 className="text-success">₹ {product.price}</h3>

          {/* Quantity Selector */}
          <div className="my-3">
            <Button onClick={decreaseQty}>-</Button>

            <span className="mx-3 fs-4">{quantity}</span>

            <Button onClick={increaseQty}>+</Button>
          </div>

          <div className="d-flex gap-3 mt-4">
            <Button
              size="lg"
              variant="warning"
              onClick={() => dispatch(addItem({ ...product, quantity }))}
            >
              Add To Cart
            </Button>

            <Button
              size="lg"
              variant="success"
              onClick={() => {
                dispatch(
                  setBuyNowProduct({
                    ...product,
                    quantity,
                  }),
                );

                navigate("/checkout");
              }}
            >
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
