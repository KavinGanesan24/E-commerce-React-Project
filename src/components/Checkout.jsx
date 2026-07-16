import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearCart } from "./store/cartSlice";
import { useNavigate } from "react-router-dom";
import { addOrder } from "./store/orderSlice";
import { clearBuyNowProduct } from "./store/buyNowSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const orderData = {
      id: Date.now(),
      items: itemsToCheckout,
      totalAmount,
      date: new Date().toLocaleString(),
    };

    dispatch(addOrder(orderData));

    if (buyNowProduct) {
      dispatch(clearBuyNowProduct());
    } else {
      dispatch(clearCart());
    }

    navigate("/order-success");
  };

  const buyNowProduct = useSelector((state) => state.buyNow.product);

  const cartItems = useSelector((state) => state.cart.cartItems);

  // ✅ FIRST decide items
  const itemsToCheckout = buyNowProduct ? [buyNowProduct] : cartItems;

  // ✅ THEN calculate total
  const totalAmount = itemsToCheckout.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Container className="mt-5">
      <Row>
        {/* Shipping Form */}
        <Col md={6}>
          <h3>Shipping Details</h3>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Enter Name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="Enter Address" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control placeholder="Phone Number" />
            </Form.Group>
          </Form>
        </Col>

        {/* Order Summary */}
        <Col md={6}>
          <h3>Order Summary</h3>

          {itemsToCheckout.map((item) => (
            <Card key={item.id} className="mb-2">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>Qty: {item.quantity}</Card.Text>
                <Card.Text>₹ {item.price * item.quantity}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <h4 className="mt-3">Total: ₹ {totalAmount}</h4>

          <Button variant="success" size="lg" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
