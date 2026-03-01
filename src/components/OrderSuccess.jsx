import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {

  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1>✅ Order Placed Successfully!</h1>
      <p>Your order will be delivered soon.</p>

      <Button
        variant="primary"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </Button>
    </Container>
  );
};

export default OrderSuccess;