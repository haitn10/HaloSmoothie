import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { message } from "antd";
import { addMenu, getAllOffices, getAllProducts } from "api";
import { list } from "firebase/storage";
import React from "react";
import { Fragment } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StoreContext } from "store";

const times = [
  { id: 1, name: "Morning" },
  { id: 2, name: "Noon" },
  { id: 3, name: "Afternoon" },
  { id: 4, name: "Evening" },
];

const menu = {
  name: "",
  officeId: "",
  sessionId: "",
};

function AddMenu() {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useContext(StoreContext);
  const [values, setValues] = useState(menu);
  const [offices, setOffices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [saleProduct, setSaleProducts] = useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      const offcices = await getAllOffices({ token: state.accessToken });
      const products = await getAllProducts({ token: state.accessToken });
      setOffices(offcices);
      setProducts(products);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      menuProducts: listProducts,
    });
  }, [listProducts]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleToggle = (value) => () => {
    const currentIndex = listProducts.findIndex((item) => item.id === value);
    const product = [...listProducts];
    if (currentIndex === -1) {
      product.push({ id: value, salePrice: "" });
    } else {
      product.splice(currentIndex, 1);
    }
    setListProducts(product);
  };

  const handleChangePrice = (index, event) => {
    const values = [...listProducts];
    values[index][event.target.name] = event.target.value;
    setListProducts(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await addMenu({ values, token: state.accessToken });
    if (result.statusCode === 200) {
      setListProducts([]);
      setValues(menu);
      info("success", result.message);
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
      <Container>
        <Box sx={{ marginRight: 10 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} padding={8}>
              <Grid item md={3} sm={2} xs={12} textAlign="end">
                <Typography>Name of Menu</Typography>
              </Grid>
              <Grid item md={9} sm={10} xs={12}>
                <TextField
                  label="Name"
                  required
                  fullWidth
                  color="success"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="e.g. Smoothie Healty"
                />
              </Grid>
              <Grid item md={3} sm={2} xs={12} textAlign="end">
                <Typography>Choose Office</Typography>
              </Grid>
              <Grid item md={9} sm={10} xs={12}>
                <FormControl fullWidth color="success">
                  <InputLabel id="demo-simple-select-label" required>
                    Offices
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.officeId}
                    label="Office"
                    name="officeId"
                    onChange={handleChange}
                  >
                    {offices.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={3} sm={2} xs={12} textAlign="end">
                <Typography>Choose Time</Typography>
              </Grid>
              <Grid item md={9} sm={10} xs={12}>
                <FormControl fullWidth color="success">
                  <InputLabel id="demo-simple-select-label" required>
                    Time
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.sessionId}
                    label="Category"
                    name="sessionId"
                    onChange={handleChange}
                  >
                    {times.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={3} sm={2} xs={12} textAlign="end">
                <Typography>Choose Products</Typography>
              </Grid>
              <Grid item md={9} sm={10} xs={12}>
                <List>
                  {products.map((value, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <TextField
                          disabled={
                            listProducts.findIndex(
                              (item) => item.id === value.id
                            ) === -1
                          }
                          name="salePrice"
                          type="number"
                          variant="standard"
                          placeholder="Sale Price"
                          required
                          inputProps={{ min: 1000 }}
                          value={listProducts.salePrice}
                          onChange={(event) => handleChangePrice(index, event)}
                        />
                      }
                    >
                      <ListItemButton onClick={handleToggle(value.id)}>
                        <ListItemIcon>
                          <Checkbox
                            checked={
                              listProducts.findIndex(
                                (item) => item.id === value.id
                              ) !== -1
                            }
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemIcon>
                        <ListItemText primary={`${value.name}`} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <LoadingButton
                  type="submit"
                  color="success"
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<Save />}
                >
                  Create
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default AddMenu;
