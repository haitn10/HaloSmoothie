import { Add, Remove, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
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
  TextField,
  Typography,
} from "@mui/material";
import { addProduct, getAllMaterials, getCategories } from "api";
import { useContext, useEffect, useState } from "react";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { StoreContext } from "store";
import { message } from "antd";
import { useNavigate } from "react-router";

const product = {
  name: "",
  calories: 0,
  price: 0,
  salePrice: 0,
  categoryId: "",
  img: "",
  descs: "",
};

const image = { file: [], filepreview: null };
const materialdefaults = { id: "", quantity: "" };

export const AddProduct = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useContext(StoreContext);
  const [values, setValues] = useState(product);
  const [images, setImages] = useState(image);
  const [categories, setCategories] = useState([]);
  const [allmaterials, setAllMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [material, setMaterial] = useState([materialdefaults]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyAPI() {
      const cateList = await getCategories({ token: state.accessToken });
      setCategories(cateList);
      const mateList = await getAllMaterials({ token: state.accessToken });
      setAllMaterials(mateList);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    if (images.file.length !== 0) {
      const imageRef = ref(storage, `products/${images.file.name}`);
      uploadBytes(imageRef, images.file).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setValues({ ...values, img: url });
        });
      });
    }
  }, [images]);

  useEffect(() => {
    setValues({ ...values, materials: [...material] });
  }, [material]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
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

  const handleChangeImage = (event) => {
    setImages({
      ...images,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await addProduct({ values, token: state.accessToken });
    if (result.statusCode === 200) {
      setImages(image);
      setMaterial([{ id: "", quantity: 0 }]);
      setValues(product);
      info("success", result.message);
      setTimeout(() => navigate("/products/"),1000);
    } else {
      info("error", result.message);
    }
    setLoading(false);
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
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 5,
          width: 550,
          mx: "auto",
        }}
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
              <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12} required>
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
                      InputProps={{ inputProps: { min: 1000 } }}
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
                          {allmaterials.map((item) => (
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
                        onChange={(event) =>
                          handleChangeMaterials(index, event)
                        }
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
                <LoadingButton
                  fullWidth
                  type="submit"
                  color="success"
                  variant="text"
                  sx={{ py: 2, mt: 5 }}
                  fontWeight="600"
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<Save />}
                >
                  Add Product
                </LoadingButton>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};
