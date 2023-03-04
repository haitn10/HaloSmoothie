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
import { editOffice } from "api";
import { storage } from "../../../firebase";
import { getDownloadURL,  ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Details({ item, open, setOpen, setItem }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useContext(StoreContext);
  const [images, setImages] = useState({ file: [], filepreview: null });
  const [office, setOffice] = useState(item);
  console.log(item);

  useEffect(() => {
    if (images.file.length !== 0) {
      const imageRef = ref(storage, `offices/${images.file.name}`);
      uploadBytes(imageRef, images.file).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setOffice({ ...office, img: url });
        });
      });
    }
  }, [images]);

  const handleChange = (event) => {
    setOffice({
      ...office,
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
    console.log(office);
    const result = await editOffice({
      id: office.id,
      values: office,
      token: state.accessToken,
    });
    console.log(result);
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
            Office Details
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
                  src={office.img}
                  alt={office.name}
                  style={{ maxWidth: 400, maxHeight: 400, marginRight: 20 }}
                />
              )}
            </Grid>
            <Grid md={10} xs={10} mb={5} justifyContent="center" display="flex">
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
                label="Office Name"
                name="name"
                value={office.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={10} mb={5} justifyContent="center" display="flex">
              <TextField
                fullWidth
                required
                label="Address"
                name="address"
                value={office.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={10} mb={5} justifyContent="center" display="flex">
              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phone"
                value={office.phone}
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
