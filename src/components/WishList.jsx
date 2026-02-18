import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MdOutlineFolderDelete } from "react-icons/md";
import { removeItem } from "./store/cartSlice";

const WishList = () => {
  const cartProducts = useSelector((state) => state.cart);
  
  let dispatch = useDispatch()

  let handleDelete = (reduxItemId)=>{
    dispatch( removeItem( reduxItemId ) )
  }



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
                    <Card.Text>₹ {product.price}</Card.Text>
                  </Card.Body>

                  <Card.Footer className="text-center">
                    <Button variant="danger" onClick={()=> handleDelete(product.id)}>
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
