import React ,{useEffect, useState} from "react";
import { Button,Grid,Paper,TextField,Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };
  /*
        {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        "rating": {
          "rate": 3.9,
          "count": 120
        }
        */

  let [updateProduct, setUpdateProduct] = useState(null);

  let navigate = useNavigate()

  let {id} = useParams()

  useEffect(()=>{
    axios.get(`https://e-commerce-react-project-adij.onrender.com/${id}`)
    .then(res => setUpdateProduct(res.data))
  },[])

  let handleChange = (e) => {
    let { value, name } = e.target;

    let fieldName = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setUpdateProduct({
        ...updateProduct,
        rating: {
          ...updateProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setUpdateProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };
  

  let handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://e-commerce-react-project-adij.onrender.com/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then(() => {
      alert("Saved successfuly");
      navigate("/product")
    });
  };
  

  if(updateProduct!==null){
    return (
    <Paper elevation={20} style={paperStyle}>
      <Typography variant="h5" textAlign="center">
        {" "}
        Update New Product
      </Typography>
      <Grid
        component="form"
        style={{ display: "grid", gap: "20px" }}
        onSubmit={handleUpdate}
      >
        <TextField
          value={updateProduct.title}
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          value={updateProduct.category}
          name="category"
          label="Category"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              value={updateProduct.rating.rate}
              name="rating.rate"
              type="number"
              label="Rate"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              value={updateProduct.rating.count}
              name="rating.count"
              type="number"
              label="Count"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="success" fullWidth>
          SAVE
        </Button>
      </Grid>
    </Paper>
  );
  }
  else{
    <div> Loading.. </div>
  }
  
};

export default UpdateProduct;
