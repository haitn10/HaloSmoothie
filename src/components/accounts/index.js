import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { AccountProfile } from "./profile";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "store";
import { getProfile, updateProfile } from "api";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { message } from "antd";

const Accounts = () => {
  const [state] = useContext(StoreContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [values, setValues] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState(moment(values.dateOfBirth));

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getProfile({ token: state.accessToken });
      setValues(response);
    }
    fetchMyAPI();
  }, [state.accessToken]);

  useEffect(() => {
    setValues({
      ...values,
      dateOfBirth: dateOfBirth.format("YYYY-MM-DD"),
    });
  }, [dateOfBirth]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const result = await updateProfile({
      values: values,
      token: state.accessToken,
    });
    if (result.statusCode === 200) {
      info("success", result.message);
    } else {
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
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
              mr: 10,
            }}
          >
            <Button color="success" variant="contained" type="submit">
              Save
            </Button>
          </Box>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile info={values} setValues={setValues} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                {values !== [] ? (
                  <Card sx={{ borderRadius: "24px", color: "#10654E" }}>
                    <CardHeader
                      title="Profile"
                      subheader={`ID: ${values.id}`}
                      sx={{ margin: "5px 20px", fontWeight: 700 }}
                    />
                    <CardContent>
                      <Grid container spacing={3} padding={2}>
                        <Grid item lg={6} sm={12}>
                          <TextField
                            fullWidth
                            helperText="Please specify the first name"
                            label="First Name"
                            name="firstName"
                            onChange={handleChange}
                            required
                            color="success"
                            value={values.firstName ? values.firstName : ""}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item lg={6} sm={12}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            color="success"
                            required
                            value={values.lastName ? values.lastName : ""}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item lg={4} sm={12}>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            color="success"
                            required
                            value={values.email ? values.email : ""}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item lg={4} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            onChange={handleChange}
                            color="success"
                            type="tel"
                            value={values.phone ? values.phone : ""}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item lg={4} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                              label="Birth Date"
                              name="dateOfBirth"
                              value={
                                values.dateOfBirth
                                  ? moment(values.dateOfBirth)
                                  : ""
                              }
                              required
                              onChange={(newValue) => setDateOfBirth(newValue)}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={12}>
                          <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            onChange={handleChange}
                            color="success"
                            required
                            type="text"
                            value={values.address ? values.address : ""}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ) : null}
              </Grid>
            </Grid>
          </Container>
        </form>
      </Box>
    </>
  );
};
export default Accounts;
