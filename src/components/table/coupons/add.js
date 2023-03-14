import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "store";
import { message } from "antd";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { addCoupon } from "api";
import { useNavigate } from "react-router-dom";

const coupon = {
  code: "",
  exp: "",
  discount: "",
};

export const AddCoupon = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [exp, setExp] = useState(moment());
  const navagate = useNavigate();
  const [state, dispatch] = useContext(StoreContext);
  const [values, setValues] = useState(coupon);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues({
      ...values,
      exp: exp.format("YYYY-MM-DD"),
    });
  }, [exp]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await addCoupon({ values, token: state.accessToken });
    if (result.statusCode === 200) {
      setLoading(false);
      setValues(coupon);
      info("success", result.message);
      setTimeout(() => navagate("/coupons"), 1000);
    } else {
      setLoading(false);
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
            CREATE COUPON
          </Typography>
          <Card sx={{ maxWidth: 500, my: 2 }}>
            <CardContent>
              <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Coupon Code"
                      name="code"
                      required
                      onChange={handleChange}
                      value={values.code}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        label="Date Import"
                        name="dateImport"
                        value={exp}
                        required
                        minDate={moment(Date.now())}
                        onChange={(newValue) => setExp(newValue)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Discount Amount"
                      name="discount"
                      type="number"
                      required
                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                      helperText="Maximum 100 discounts"
                      onChange={handleChange}
                      value={values.discount}
                      variant="outlined"
                    />
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
                    Create
                  </LoadingButton>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};
