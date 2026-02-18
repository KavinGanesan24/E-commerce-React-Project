import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LifeLine } from "react-loading-indicators";
import useFetch from "./custom-hook/useFetch";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineFolderDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import { addItem } from "./store/cartSlice";
import { Container, Row, Col } from "react-bootstrap";

const ProductList = () => {
  let navigate = useNavigate();

  let { products, error, isLoading, setProducts } = useFetch(
    "http://localhost:5000/products",
  );

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
 
  let dispatch = useDispatch()

  let cartState = useSelector( (state)=>{ return state.cart }  )

  let addItemToCart = (product) => { 

    let checkProduct = cartState.some( cartProduct => cartProduct.id === product.id )
    
      if(!checkProduct){
        dispatch( addItem( product )  )
        Swal.fire({
          title: "Success",
          text: "Product Added Successfully",
          icon: "success",
        });
      }
      else{
        Swal.fire({
          title: "Oops!",
          text: "Product Already Added",
          icon: "error",
          footer : "<p> Add Some other Product </p>"
        });
      }
  }

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
        <article>
          {" "}
          <span>To Create New Product</span>{" "}
          <Button
            onClick={() => {
              navigate("/newProduct");
            }}
          >
            Click Me
          </Button>{" "}
        </article>
        {products.length !== 0 && (
          <Container className="mt-4">
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product.id} md={4} sm={6} xs={12}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: "200px", objectFit: "contain" }}
                    />

                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                    </Card.Body>

                    <Card.Footer className="d-flex justify-content-evenly">
                      <Button
                        variant="primary"
                        onClick={() => addItemToCart(product)}
                      >
                        <MdAddShoppingCart />
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/update/${product.id}`)}
                      >
                        <FaEdit />
                      </Button>

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
        {error && <p> {error} </p>}{" "}
      </div>
    );
  }
};

export default ProductList;
