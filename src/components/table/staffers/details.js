import { Close } from "@mui/icons-material";
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
import { getAllOffices, updateStaff } from "api";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "store";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Details({ item, open, setOpen, setItem }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [state] = useContext(StoreContext);
  const [images, setImages] = useState({ file: [], filepreview: null });
  const [staff, setStaff] = useState(item);
  const [dateOfBirth, setDateOfBirth] = useState(moment(item.dateOfBirth));
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const storeList = await getAllOffices({ token: state.accessToken });
      setStores(storeList);
    }
    fetchMyAPI();
  }, [state.accessToken]);

  useEffect(() => {
    if (images.file.length !== 0) {
      const imageRef = ref(storage, `staff/${images.file.name}`);
      uploadBytes(imageRef, images.file).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setStaff({ ...staff, img: url });
        });
      });
    }
  }, [images]);

  useEffect(() => {
    setStaff({
      ...staff,
      dateOfBirth: dateOfBirth.format("YYYY-MM-DD"),
    });
  }, [dateOfBirth]);

  const handleChange = (e) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setItem(null);
    setOpen(false);
  };

  const handleChangeImage = (event) => {
    setImages({
      ...images,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateStaff({
      id: staff.id,
      values: staff,
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
              Staff Profile
              <Typography variant="subtitle1" fontSize={10}>
                ID: {staff.id}
              </Typography>
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={handleSubmit} style={{ margin: 50 }}>
          <Grid
            container
            justifyContent="center"
            display="flex"
            maxWidth={1500}
            gap={2}
          >
            <Box alignItems="center" display="flex" flexDirection="column">
              {images.filepreview !== null ? (
                <img
                  src={images.filepreview}
                  style={{ maxWidth: 300, maxHeight: 300, marginRight: 20 }}
                  alt=""
                />
              ) : (
                <img
                  src={staff.image}
                  alt={staff.name}
                  style={{ maxWidth: 300, maxHeight: 300, marginRight: 20 }}
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
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    required
                    label="First Name"
                    name="firstName"
                    value={staff.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    required
                    label="Last Name"
                    name="lastName"
                    value={staff.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Birth Date"
                      name="dateOfBirth"
                      value={staff.dateOfBirth ? moment(staff.dateOfBirth) : ""}
                      required
                      onChange={(newValue) => setDateOfBirth(newValue)}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    value={staff.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    name="phone"
                    value={staff.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth color="success">
                    <InputLabel id="demo-simple-select-label" required>
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={staff.roleId}
                      label="Role"
                      name="roleId"
                      onChange={handleChange}
                    >
                      <MenuItem value={2}>Staff</MenuItem>
                      <MenuItem value={1}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth color="success">
                    <InputLabel id="demo-simple-select-label">Store</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={staff.officeId}
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
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={staff.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  display="flex"
                  justifyContent="center"
                  mb={10}
                >
                  <Button color="success" variant="contained" type="submit">
                    Save
                  </Button>
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
