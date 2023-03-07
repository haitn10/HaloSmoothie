import { Box, Container, Grid } from "@mui/material";
import { AccountProfileDetails } from "./detail-profile";
import { AccountProfile } from "./profile";

const accounts = {
  firstName: "Katarina",
  lastName: "Smitha",
  email: "demo@devias.io",
  phone: "+8491123942",
  password: "123",
  image: "",
  address: "HCM VietNam",
  dateOfBirth: "2023-02-20",
  office: "HCM",
  role: "Admin",
};

const Accounts = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 3,
      }}
    >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            mr: 7,
          }}
        >
          <Button color="primary" variant="contained"  onClick={this.onSubmit}>
            Save details
          </Button>
        </Box>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile info={accounts} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails info={accounts} />
            </Grid>
          </Grid>
        </Container>
    </Box>
  );
};
export default Accounts;
