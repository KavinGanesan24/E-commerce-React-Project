import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LifeLine } from "react-loading-indicators";
import useFetch from "./custom-hook/useFetch";
import { MdAddShoppingCart } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store/cartSlice";
import { Container, Row, Col } from "react-bootstrap";



const ProductList = () => {
  let navigate = useNavigate();

  const searchTerm = useSelector((state) => state.search.searchTerm);

  let { products, error, isLoading, setProducts } = useFetch(
    "http://localhost:5000/products",
  );
  const handleBuyNow = (product) => {
    dispatch(addItem(product));
    navigate("/checkout");
  };

  let handleDelete = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`).then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
      let newProductList = products.filter((product) => product.id !== id);
      setProducts(newProductList);
    });
  };

  let dispatch = useDispatch();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  let cartState = useSelector((state) => {
    return state.cart.cartItems;
  });

  let addItemToCart = (product) => {
    dispatch(addItem(product));

    Swal.fire({
      title: "Success",
      text: "Product Added Successfully",
      icon: "success",
    });
  };

  if (isLoading) {
    return (
      <div>
        <center>
          <LifeLine
            color="#32cd32"
            size="large"
            text="Loading..."
            textColor="red"
          />
        </center>
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        {products.length !== 0 && (
          <Container className="mt-4">
            <Row className="g-4">
              {filteredProducts.map((product) => (
                <Col key={product.id} md={4} sm={6} xs={12}>
                  <Card
                    className="h-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: "200px", objectFit: "contain" }}
                    />

                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>Rs : {product.price}</Card.Text>
                    </Card.Body>

                    <Card.Footer className="d-flex justify-content-evenly">
                      <Button
                        variant= "primary"
                        onClick={() => handleBuyNow(product)}
                        className="buy-btn"
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          addItemToCart(product);
                        }}
                      >
                        <MdAddShoppingCart />
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
        {error && <p> {error} </p>}{" "}
      </div>
    );
  }
};

export default ProductList;
