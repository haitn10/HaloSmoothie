import { Add, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  Fab,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { addOffice } from "api";
import { useContext, useEffect, useState } from "react";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { StoreContext } from "store";
import { message } from "antd";

const office = {
  name: "",
  address: "",
  phone: "",
  img: "",
};

const image = { file: [], filepreview: null };

export const AddOffice = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useContext(StoreContext);
  const [values, setValues] = useState(office);
  const [images, setImages] = useState(image);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (images.file.length !== 0) {
      const imageRef = ref(storage, `offices/${images.file.name}`);
      uploadBytes(imageRef, images.file).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setValues({ ...values, img: url });
        });
      });
    }
  }, [images]);

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
    const result = await addOffice({ values, token: state.accessToken });
    console.log(result);
    if (result.statusCode === 200) {
      setLoading(false);
      setValues(office);
      setImages(image);
      info("success", result.message);
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
            ADD STORE
          </Typography>
          <Card sx={{ maxWidth: 500, my: 2 }}>
            <CardContent>
              <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Store Name"
                      name="name"
                      onChange={handleChange}
                      InputProps={{ inputProps: { min: 0, max: 200 } }}
                      required
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      required
                      value={values.address}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Phone Number"
                      name="phone"
                      onChange={handleChange}
                      value={values.phone}
                      variant="outlined"
                    />
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
                      Image
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
                  Add Product
                </LoadingButton>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};
