import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { API } from "api";
import React, { useState } from "react";
import { useEffect } from "react";

export const Product = () => {
  const [values, setValues] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (product) => {
    try {
      setLoading(true);
      const result = await API.post('/products/add', product);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
    }
    
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ backgroundColor: "#fff", borderRadius: 5, width: 550, mx: "auto" }}
      flexDirection="column"
    >
      <Typography
        variant="h4"
        color="green"
        py={2}
        fontWeight={700}
        fontStyle="initial"
      >
        ADD PRODUCTS
      </Typography>
      <Card sx={{ maxWidth: 500, my: 2 }}>
        <CardContent>
          <form>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Name of product"
                  color="success"
                  label="Product Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Calories of the product"
                  color="success"
                  label="Calo"
                  name="calories"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.calories}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  color="success"
                  label="Price"
                  name="price"
                  onChange={handleChange}
                  required
                  type="number"
                  minRows={1000}
                  value={values.price}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  color="success"
                  label="sale Price"
                  name="salePrice"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.salePrice}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  color="success"
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  required
                  value={values.category}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  color="success"
                  fullWidth
                  label="Description"
                  name="descs"
                  onChange={handleChange}
                  value={values.descs}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  color="success"
                  variant="text"
                  sx={{ py: 2 }}
                  fontWeight="600"
                  onClick={onSubmit}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<Save />}
                >
                  Add Product
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
