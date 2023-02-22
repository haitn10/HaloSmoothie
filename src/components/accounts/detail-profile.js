import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";


export const AccountProfileDetails = ({info}) => {
  const [values, setValues] = useState(info);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  console.log(values);

  return (
    <form autoComplete="off" noValidate>
      <Card sx={{ borderRadius: "24px", color: "#10654E" }}>
        <CardHeader
          subheader="My information"
          title="Profile"
          sx={{ margin: "5px 20px" }}
        />
        <Divider />
        <CardContent >
          <Grid container spacing={3} padding={2}>
            <Grid item lg={6} md={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                required
                color="success"
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} md={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                color="success"
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} md={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                color="success"
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} md={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                color="success"
                type="tel"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} md={12}>
              <TextField
                fullWidth
                label="Birth"
                name="dateOfBirth"
                onChange={handleChange}
                color="success"
                required
                type="date"
                value={values.dateOfBirth}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} md={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                color="success"
                required
                type="text"
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} md={12}>
              <TextField
                fullWidth
                label="Office"
                name="office"
                onChange={handleChange}
                color="success"
                required
                type="text"
                value={values.office}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};
