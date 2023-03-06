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
import { message } from "antd";
import { updatMaterial } from "api";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "store";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Details({ item, open, setOpen, setItem }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useContext(StoreContext);
  const [material, setMaterial] = useState(item);
  const [images, setImages] = useState({ file: [], filepreview: null });
  const [dateImport, setDateImport] = useState(moment(material.dateImport));
  const [dateExport, setDateExport] = useState(moment(material.dateExport));

  useEffect(() => {
    if (images.file.length !== 0) {
      const imageRef = ref(storage, `materials/${images.file.name}`);
      uploadBytes(imageRef, images.file).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setMaterial({ ...material, img: url });
        });
      });
    }
  }, [images]);

  useEffect(() => {
    setMaterial({
      ...material,
      dateImport: dateImport.format("YYYY-MM-DD"),
      dateExport: dateExport.format("YYYY-MM-DD"),
    });
  }, [dateExport, dateImport]);

  const handleChange = (event) => {
    setMaterial({
      ...material,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setItem(null);
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
    const result = await updatMaterial({
      id: material.id,
      values: material,
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
              material Details
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            mt={5}
            minWidth={1000}
            justifyContent="center"
            display="flex"
          >
            <Grid
              item
              md={6}
              xs={12}
              display="flex"
              flexDirection="column"
              paddingLeft={5}
            >
              <Grid xs={10} mb={5} display="flex">
                {images.filepreview !== null ? (
                  <img
                    src={images.filepreview}
                    style={{ maxWidth: 400, maxHeight: 400, marginRight: 20 }}
                    alt=""
                  />
                ) : (
                  <img
                    src={material.img}
                    alt={material.name}
                    style={{ maxWidth: 400, maxHeight: 400, marginRight: 20 }}
                  />
                )}
              </Grid>
              <Grid
                md={10}
                xs={10}
                mb={5}
                justifyContent="center"
                display="flex"
              >
                <label>
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
              </Grid>
            </Grid>
            <Grid md={6} xs={12}>
              <Grid xs={10} mb={5} justifyContent="center" display="flex">
                <TextField
                  required
                  fullWidth
                  label="Material Name"
                  name="name"
                  value={material.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={10} mb={5} justifyContent="center" display="flex">
                <TextField
                  fullWidth
                  color="success"
                  label="Price"
                  name="price"
                  type="number"
                  required
                  InputProps={{ inputProps: { min: 1000 } }}
                  onChange={handleChange}
                  value={material.price}
                  variant="outlined"
                />
              </Grid>
              <Grid
                xs={10}
                mb={5}
                justifyContent="center"
                display="flex"
                gap={2}
              >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Date Import"
                    name="dateImport"
                    value={dateImport}
                    onChange={(newValue) => setDateImport(newValue)}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Date Export"
                    name="dateExport"
                    value={dateExport}
                    onChange={(newValue) => setDateExport(newValue)}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid
                xs={10}
                mb={5}
                justifyContent="center"
                display="flex"
                gap={2}
              >
                <TextField
                  fullWidth
                  color="success"
                  label="Calories"
                  name="calories"
                  type="number"
                  required
                  placeholder="e.g. 10"
                  InputProps={{ inputProps: { min: 0, max: 200 } }}
                  onChange={handleChange}
                  value={material.calories}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  color="success"
                  label="Color Code"
                  placeholder="e.g. #000000"
                  name="color"
                  type="color"
                  
                  required
                  onChange={handleChange}
                  value={material.color}
                  variant="outlined"
                />
              </Grid>
              <Grid xs={10} mb={5} justifyContent="center" display="flex">
                <TextField
                  multiline
                  rows={4}
                  color="success"
                  fullWidth
                  label="Description"
                  name="descs"
                  onChange={handleChange}
                  value={material.descs}
                  variant="outlined"
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
