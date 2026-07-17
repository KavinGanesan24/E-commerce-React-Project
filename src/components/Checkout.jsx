import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearCart } from "./store/cartSlice";
import { addOrder } from "./store/orderSlice";
import { clearBuyNowProduct } from "./store/buyNowSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");

  const buyNowProduct = useSelector((state) => state.buyNow.product);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const itemsToCheckout = buyNowProduct ? [buyNowProduct] : cartItems;

  const totalAmount = itemsToCheckout.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    console.log("Selected Payment Method:", paymentMethod);

    const orderData = {
      id: Date.now(),
      items: itemsToCheckout,
      totalAmount,
      paymentMethod,
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

  return (
    <Container className="mt-5">
      <Row>
        {/* Shipping Form */}
        <Col md={6}>
          <h3>Shipping Details</h3>

          <Form id="checkoutForm" onSubmit={handlePlaceOrder}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter Address" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Phone Number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Payment Method</Form.Label>

              <Form.Check
                type="radio"
                label="Cash on Delivery"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />

              <Form.Check
                type="radio"
                label="UPI"
                name="paymentMethod"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <Form.Check
                type="radio"
                label="Debit / Credit Card"
                name="paymentMethod"
                value="CARD"
                checked={paymentMethod === "CARD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form.Group>
            {paymentMethod !== "COD" && (
              <div className="mt-4">
                <h1>Payment Details</h1>
                {paymentMethod === "UPI" && (
                  <Form.Group className="mb-3">
                    <Form.Label>UPI ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="UPI ID"
                    ></Form.Control>
                  </Form.Group>
                )}
                {paymentMethod === "CARD" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Card Number"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Holder Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Card Holder Name"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="month"
                        placeholder="Expiry Date"
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="CVV"
                      ></Form.Control>
                    </Form.Group>
                  </>
                )}
              </div>
            )}
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

          <Button variant="success" size="lg" type="submit" form="checkoutForm">
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
