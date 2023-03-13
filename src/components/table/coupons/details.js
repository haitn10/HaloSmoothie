import { Close } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { message } from "antd";
import { editCoupon } from "api";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Details({ item, open, setOpen, setItem }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useContext(StoreContext);
  const [coupon, setCoupon] = useState(item);
  const [exp, setExp] = useState(moment(coupon.exp));

  useEffect(() => {
    setCoupon({
      ...coupon,
      exp: exp.format("YYYY-MM-DD"),
    });
  }, [exp]);

  const handleChange = (event) => {
    setCoupon({
      ...coupon,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(coupon);
    const result = await editCoupon({
      id: coupon.id,
      values: coupon,
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
              Coupon Details
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={handleSubmit}>
          <Grid mt={5} width={700} justifyContent="center" display="flex">
            <Grid md={6} xs={12}>
              <Grid xs={12} mb={5} justifyContent="center" display="flex">
                <TextField
                  required
                  fullWidth
                  label="Coupon Code"
                  name="code"
                  value={coupon.code}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                xs={12}
                mb={5}
                justifyContent="center"
                display="flex"
                gap={2}
              >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Date Import"
                    name="dateImport"
                    value={exp}
                    onChange={(newValue) => setExp(newValue)}
                  />
                </LocalizationProvider>

                <TextField
                  required
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label="Discount Number"
                  name="discount"
                  value={coupon.discount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={10} mb={5} justifyContent="center" display="flex">
                <Button
                  autoFocus
                  color="success"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </>
  );
}

export default Details;
