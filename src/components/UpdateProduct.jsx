import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  const [updateProduct, setUpdateProduct] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-react-project-adij.onrender.com/${id}`,
        );

        setUpdateProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name.includes("rating.")) {
      const fieldName = name.split("rating.")[1];

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://e-commerce-react-project-adij.onrender.com/${id}`,
        updateProduct,
      );

      alert("Saved successfully");

      navigate("/product");
    } catch (error) {
      console.error("Error updating product:", error);

      alert("Failed to update product");
    }
  };

  if (updateProduct === null) {
    return <div>Loading...</div>;
  }

  return (
    <Paper elevation={20} style={paperStyle}>
      <Typography variant="h5" textAlign="center">
        Update New Product
      </Typography>

      <Grid
        component="form"
        style={{
          display: "grid",
          gap: "20px",
        }}
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
};

export default UpdateProduct;
