import { Close, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  AppBar,
  Checkbox,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { message } from "antd";
import { updateMenu } from "api";
import React, { useEffect, useState } from "react";

const times = [
  { id: 1, name: "Morning" },
  { id: 2, name: "Noon" },
  { id: 3, name: "Afternoon" },
  { id: 4, name: "Evening" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Details({ menu, open, offices, products, token, setOpen, setMenu }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [menuItem, setMenuItem] = useState(menu);
  const [listProducts, setListProducts] = useState(menu.menuProducts);
  const [loading, setLoading] = useState(false);

  console.log(listProducts);

  useEffect(() => {
    setMenuItem({
      ...menuItem,
      menuProducts: listProducts,
    });
  }, [listProducts]);

  const handleChange = (event) => {
    setMenu({
      ...menu,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setMenu(null);
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

  const handleChangePrice = (event) => {
    const values = [...listProducts];
    for (const [key] of Object.entries(values)) {
      values[key][event.target.name] = event.target.value;
    }
    setMenu(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateMenu({
      id: menuItem.id,
      values: menuItem,
      token: token,
    });
    if (result.statusCode === 200) {
      setOpen(false);
      info("success", result.message);
      setLoading(false);
    } else {
      setOpen(false);
      info("error", result.message);
      setLoading(false);
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
        maxWidth="md"
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
              Menu Details
              <Typography fontSize={10}>ID: {menu.id}</Typography>
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={handleSubmit} style={{ margin: 50 }}>
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
                value={menuItem.name}
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
                  value={menuItem.officeId}
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
                  value={menuItem.sessionId}
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
                          listProducts
                            ? listProducts.findIndex(
                                (item) => item.id === value.id
                              ) === -1
                            : false
                        }
                        name="salePrice"
                        type="number"
                        variant="standard"
                        placeholder="Sale Price"
                        required
                        inputProps={{ min: 1000 }}
                        value={listProducts ? listProducts.salePrice : ""}
                        onChange={(event) => handleChangePrice(index, event)}
                      />
                    }
                  >
                    <ListItemButton onClick={handleToggle(value.id)}>
                      <ListItemIcon>
                        <Checkbox
                          checked={
                            listProducts
                              ? listProducts.findIndex(
                                  (item) => item.id === value.id
                                ) !== -1
                              : false
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
                loadingPosition="start"
                loading={loading}
                startIcon={<Save />}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </>
  );
}

export default Details;
