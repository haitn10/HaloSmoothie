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
import React, { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Details({
  item,
  open,
  setOpen,
  setItem,
  state,
  categories,
  materials,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [product, setProduct] = useState(item);
  const [material, setMaterial] = useState(product.materials);
  const [images, setImages] = useState({ file: [], filepreview: null });

  useEffect(() => {
    if (images.file.length !== 0) {
      const imageRef = ref(storage, `products/${images.file.name}`);
      uploadBytes(imageRef, images.file).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setProduct({ ...product, img: url });
        });
      });
    }
    setProduct({ ...product, materials: material });
  }, [images]);

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
    console.log(value);
    if (value.length < 5) {
      setMaterial([...material, { id: "", quantity: "" }]);
    }
  };

  const handleChangeImage = (event) => {
    setImages({
      ...images,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  const handleSubmit = async (e) => {
    e.prevenDefault();
    const result = await updateProduct({ product, token: state.accessToken });
    if (result.statusCode === 200) {
      setOpen(true);
      info("success", result.message);
    } else {
      setOpen(true);
      info("error", result.message);
    }
    setOpen(false);
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
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <form onSubmit={handleSubmit}>
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
            <Button autoFocus color="success" variant="contained" type="submit">
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <Grid
          justifyContent="center"
          display="flex"
          flexDirection="row"
          gap={3}
          mt={8}
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
            <Grid container spacing={3} width={700}>
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  InputProps={{ inputProps: { min: 1000 } }}
                  label="Price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  InputProps={{ inputProps: { min: 1000 } }}
                  label="Sale Price"
                  name="salePrice"
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
                    value={product.category.id}
                    name="category"
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
                  label="Calo"
                  name="calories"
                  value={product.calories}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  required
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