import { Add, Remove, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { API, baseURL } from "api";
import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { storage } from "../../data/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export const Product = () => {
  const [values, setValues] = useState({
    name: "",
    calories: 0,
    price: 0,
    salePrice: 0,
    categoryId: "",
    image: "",
    descs: "",
  });
  const [images, setImages] = useState({ file: [], filepreview: null });
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageListRef = ref(storage, "images/");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [material, setMaterial] = useState([{ id: "", quantity: "" }]);
  const vertical = "top";
  const horizontal = "right";

  useEffect(() => {
    Axios.get(`${baseURL}/api/category`)
      .then((category) => {
        const data = category.data;
        setCategories(data);
      })
      .catch((error) => console.log(error));
    Axios.get(`${baseURL}/api/materials`)
      .then((material) => {
        const data = material.data;
        setMaterials(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setValues({ ...values, image: images.file, materials: material });
  }, [images.file, material, values]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    setImages({
      ...images,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleChangeMaterials = (index, event) => {
    const values = [...material];
    values[index][event.target.name] = event.target.value;
    setMaterial(values);
  };

  const handleRemoveFields = (index) => {
    const value = [...material];
    if (value.length > 1) {
      value.splice(index, 1);
      setMaterial(value);
    }
  };

  const handleAddFields = () => {
    const value = [...material];
    if (value.length < 5) {
      setMaterial([...material, { id: "", quantity: "" }]);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const uploadImage = async (image) => {
    if (image.length !== 0) {
      const code = v4();
      const imageRef = await ref(storage, `images/${image.name + code}`);
      uploadBytes(imageRef, image).then(() => {
        console.log("Image uploaded successfully");
        listAll(imageListRef).then((response) => {
          response.items.forEach((element) => {
            getDownloadURL(element).then((url) => {
              setValues({ ...values, image: url });
            });
          });
        });
      });
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // const upload = await uploadImage(values.image);
      // console.log(upload);
      const result = await API.post("/products", values);
      console.log(result);
      setLoading(false);
      //   console.log(result);
      //   return result;
    } catch (error) {
      setOpen(true);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "#fff", borderRadius: 5, width: 550, mx: "auto" }}
    >
      <Grid
        item
        md={6}
        xs={12}
        flexDirection="column"
        display="flex"
        alignItems="center"
        justifyItems="center"
      >
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage === "" ? errorMessage : "Add new Product failed!"}
          </Alert>
        </Snackbar>
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
              <Grid container spacing={3} noValidate autoComplete="off">
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
                    InputProps={{ inputProps: { min: 0, max: 200 } }}
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
                    InputProps={{ inputProps: { min: 1000 } }}
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
                    InputProps={{ inputProps: { min: 0 } }}
                    type="number"
                    value={values.salePrice}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth color="success">
                    <InputLabel id="demo-simple-select-label" required>
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.categoryId}
                      label="Category"
                      name="categoryId"
                      onChange={handleChange}
                    >
                      {categories.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={4}
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                >
                  <label
                    htmlFor="upload-photo"
                    style={{ padding: 10, margin: 10 }}
                  >
                    Image
                  </label>
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleChangeImage(event)}
                    />
                    <Fab
                      color="error"
                      size="small"
                      variant="circular"
                      component="span"
                      aria-label="add"
                    >
                      <Add />
                    </Fab>
                  </label>
                </Grid>

                <Grid item xs={8}>
                  {images.filepreview !== null ? (
                    <img src={images.filepreview} height={150} alt="" />
                  ) : null}
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
              </Grid>
              <br />
              <hr />
              <Grid
                flexDirection="column"
                display="flex"
                alignItems="center"
                justifyItems="center"
              >
                <Typography
                  variant="h6"
                  color="green"
                  py={2}
                  fontWeight={700}
                  fontStyle="initial"
                >
                  Materials Of Product
                </Typography>
                {material.map((inputMaterial, index) => (
                  <Box
                    key={index}
                    alignItems="center"
                    display="flex"
                    gap={2}
                    mb={2}
                  >
                    <FormControl xs={4} color="success" sx={{ width: 150 }}>
                      <InputLabel id="demo-simple-select-label" required>
                        Material
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={inputMaterial.id}
                        label="Material"
                        name="id"
                        required
                        onChange={(event) =>
                          handleChangeMaterials(index, event)
                        }
                      >
                        {materials.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      color="success"
                      label="Quantity"
                      name="quantity"
                      required
                      sx={{ width: 150 }}
                      onChange={(event) => handleChangeMaterials(index, event)}
                      InputProps={{ inputProps: { min: 1 } }}
                      type="number"
                      value={inputMaterial.quantity}
                      variant="outlined"
                    />
                    <IconButton onClick={() => handleRemoveFields(index)}>
                      <Remove />
                    </IconButton>
                    <IconButton onClick={handleAddFields}>
                      <Add />
                    </IconButton>
                  </Box>
                ))}
                <LoadingButton
                  fullWidth
                  type="submit"
                  color="success"
                  variant="text"
                  sx={{ py: 2, mt: 5 }}
                  fontWeight="600"
                  onClick={onSubmit}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<Save />}
                >
                  Add Product
                </LoadingButton>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};
