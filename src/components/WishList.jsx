import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MdOutlineFolderDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "./store/cartSlice";

import { setBuyNowProduct } from "./store/buyNowSlice";

const WishList = () => {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleBuyNow = (product) => {
    dispatch(setBuyNowProduct(product));
    navigate("/checkout");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div>
      {cartProducts.length === 0 ? (
        <h3 className="text-center mt-4">Cart is Empty</h3>
      ) : (
        <Container className="mt-4">
          <Row className="g-4">
            {cartProducts.map((product) => (
              <Col key={product.id} md={4} sm={6} xs={12}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />

                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>

                    <Card.Text>Price : ₹ {product.price}</Card.Text>

                    {/* Quantity */}
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                      <Button
                        variant="secondary"
                        onClick={() => handleDecrease(product.id)}
                      >
                        -
                      </Button>

                      <span>{product.quantity}</span>

                      <Button
                        variant="secondary"
                        onClick={() => handleIncrease(product.id)}
                      >
                        +
                      </Button>
                    </div>

                    <Card.Text>
                      Total : ₹ {product.price * product.quantity}
                    </Card.Text>

                    <div className="d-flex justify-content-between">
                      <Button
                        variant="warning"
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        <MdOutlineFolderDelete />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Cart Total */}
          <div className="text-center mt-5">
            <h3>Total Amount : ₹ {totalAmount}</h3>

            <Button variant="success" size="lg" onClick={handleCheckout}>
              Proceed To Checkout
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
};

export default WishList;
