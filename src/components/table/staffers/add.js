import { Add, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { addStaff, getAllOffices } from "api";
import { useContext, useEffect, useState } from "react";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { StoreContext } from "store";
import { message } from "antd";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const staff = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  officeId: "",
  roleId: "",
  img: "",
};

const image = { file: [], filepreview: null };

export const AddStaff = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [state] = useContext(StoreContext);
  const navagate = useNavigate();
  const [values, setValues] = useState(staff);
  const [images, setImages] = useState(image);
  const [dateOfBirth, setDateOfBirth] = useState(moment(staff.dateOfBirth));
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const storeList = await getAllOffices({ token: state.accessToken });
      setStores(storeList);
    }
    fetchMyAPI();
  }, [state.accessToken]);

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
    const result = await addStaff({ values, token: state.accessToken });
    console.log(result);
    if (result.statusCode === 200) {
      info("success", result.message);
      setTimeout(() => navagate("/staffers"), 1000);
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
            ADD STAFFER
          </Typography>
          <Card sx={{ maxWidth: 500, my: 2 }}>
            <CardContent>
              <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12} required>
                    <TextField
                      fullWidth
                      color="success"
                      label="First Name"
                      name="firstName"
                      onChange={handleChange}
                      inputProps={{ maxLength: 20 }}
                      required
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      inputProps={{ maxLength: 20 }}
                      required
                      value={values.lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      inputProps={{ maxLength: 45 }}
                      required
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Password"
                      name="password"
                      helperText="(3-20 characters)"
                      required
                      onChange={handleChange}
                      type="password"
                      inputProps={{ minLength: 3, maxLength: 20 }}
                      value={values.password}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Address"
                      helperText="(Maximum 120 characters)"
                      name="address"
                      onChange={handleChange}
                      inputProps={{ maxLength: 120 }}
                      value={values.address}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Phone Number"
                      name="phone"
                      onChange={handleChange}
                      inputProps={{ maxLength: 10 }}
                      type="tel"
                      value={values.phone}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterMoment} required>
                      <DatePicker
                        required
                        label="Birth Date"
                        name="dateOfBirth"
                        value={
                          values.dateOfBirth ? moment(values.dateOfBirth) : ""
                        }
                        maxDate={moment(Date.now())}
                        onChange={(newValue) => setDateOfBirth(newValue)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth color="success">
                      <InputLabel id="demo-simple-select-label" required>
                        Store
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.officeId}
                        label="store"
                        name="officeId"
                        onChange={handleChange}
                      >
                        {stores.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth color="success">
                      <InputLabel id="demo-simple-select-label" required>
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.roleId}
                        label="Role"
                        name="roleId"
                        onChange={handleChange}
                      >
                        <MenuItem value={2}>Staff</MenuItem>
                        <MenuItem value={1}>Admin</MenuItem>
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
                      Avatar
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
                  Add Staff
                </LoadingButton>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};
