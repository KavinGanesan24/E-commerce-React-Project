import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MdOutlineFolderDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { setCheckoutItem } from "./store/cartSlice";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "./store/cartSlice";

const WishList = () => {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  let handleDelete = (reduxItemId) => {
    dispatch(removeItem(reduxItemId));
  };
  let handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  let handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div>
      {cartProducts.length === 0 && (
        <h3 className="text-center mt-4">Cart is Empty</h3>
      )}

      {cartProducts.length !== 0 && (
        <Container className="mt-4">
          <Row className="g-4">
            {cartProducts.map((product) => (
              <Col key={product.id} md={4} sm={6} xs={12}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ height: "200px", objectFit: "contain" }}
                  />

                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text> Rs : {product.price}</Card.Text>
                    <div className="d-flex align-items-center justify-content-center gap-3">
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
                      Total Amount: Rs : {product.quantity * product.price}
                    </Card.Text>
                    <Button
                      variant="success"
                      onClick={() => navigate("/checkout")}
                    >
                      Proceed To Checkout
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => {
                        dispatch(setCheckoutItem(product));
                        navigate("/checkout");
                      }}
                    >
                      Buy Now
                    </Button>
                  </Card.Body>

                  <Card.Footer className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      <MdOutlineFolderDelete />
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default WishList;
