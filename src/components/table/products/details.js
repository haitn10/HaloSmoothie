import { Add, Close, Remove } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { message } from "antd";
import { updateProduct } from "api";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Details({ item, open, setOpen, setItem, categories, materials }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useContext(StoreContext);
  const [images, setImages] = useState({ file: [], filepreview: null });
  const [product, setProduct] = useState(item);
  const [material, setMaterial] = useState(product.materials);
  let price = 0;

  useEffect(() => {
    if (images.file.length !== 0) {
      const imageRef = ref(storage, `products/${images.file.name}`);
      uploadBytes(imageRef, images.file).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setProduct({ ...product, img: url });
        });
      });
    }
  }, [images]);

  useEffect(() => {
    setProduct({ ...product, materials: [...material] });
  }, [material]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setItem(null);
    setOpen(false);
  };

  const handleChangeImage = (event) => {
    setImages({
      ...images,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  // Add materials
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProduct({
      id: product.id,
      values: product,
      token: state.accessToken,
    });
    if (result.statusCode === 200) {
      setOpen(false);
      info("success", result.message);
    } else {
      setOpen(false);
      info("error", result.message);
    }
  };

  const info = (status, msg) => {
    messageApi.open({
      type: status,
      content: msg,
    });
  };

  return (
    <>
      {contextHolder}
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#eee" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="#10654E"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
              color="#10654E"
            >
              Product Details
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={handleSubmit} style={{ margin: 50 }}>
          <Grid
            container
            justifyContent="center"
            display="flex"
            maxWidth={1500}
            gap={2}
          >
            <Box alignItems="center" display="flex" flexDirection="column">
              {images.filepreview !== null ? (
                <img
                  src={images.filepreview}
                  style={{ maxWidth: 400, maxHeight: 400, marginRight: 20 }}
                  alt=""
                />
              ) : (
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ maxWidth: 400, maxHeight: 400, marginRight: 20 }}
                />
              )}
              <label
                htmlFor="upload-photo"
                style={{ padding: 10, margin: 10 }}
              ></label>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleChangeImage(event)}
                />
                <Button
                  color="success"
                  variant="outlined"
                  component="span"
                  aria-label="add"
                >
                  Change Image
                </Button>
              </label>
            </Box>
            <Box>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />
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
                        {materials.map((item) => {
                          if (item.id === inputMaterial.id) {
                            price += item.price * inputMaterial.quantity;
                          }
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <TextField
                      color="success"
                      label="Quantity (pieces)"
                      name="quantity"
                      required
                      sx={{ width: 150 }}
                      onChange={(event) => handleChangeMaterials(index, event)}
                      InputProps={{ inputProps: { min: 1, max: 15 } }}
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
                <Typography>
                  Total: {Intl.NumberFormat("vi-VN").format(price)} VND
                </Typography>
              </Grid>
              <br />
              <hr />
              <Grid container spacing={3} width={700} mt={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    inputProps={{ min: 1000, max: 500000 }}
                    label="Price"
                    name="price"
                    helperText="(VND/glass)"
                    value={product.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    inputProps={{ min: 1000, max: 500000 }}
                    label="Sale Price"
                    name="salePrice"
                    helperText="(VND/glass)"
                    value={product.salePrice}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth color="success">
                    <InputLabel id="demo-simple-select-label" required>
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      value={product.categoryId}
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    label="Calories"
                    name="calories"
                    type="number"
                    inputProps={{ min: 0, max: 10000 }}
                    helperText="(calo/glass)"
                    value={product.calories}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={6}
                    color="success"
                    fullWidth
                    label="Description"
                    name="descs"
                    value={product.descs}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3}></Grid>

                <Grid
                  item
                  xs={10}
                  display="flex"
                  justifyContent="center"
                  mb={10}
                >
                  <Button color="success" variant="contained" type="submit">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </form>
      </Dialog>
    </>
  );
}

export default Details;
