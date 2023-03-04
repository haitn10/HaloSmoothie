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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const office = {
  name: "",
  address: "",
  phone: "",
  img: "",
};

const image = { file: [], filepreview: null };

export const AddMaterial = () => {
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
            ADD MATERIALS
          </Typography>
          <Card sx={{ maxWidth: 500, my: 2 }}>
            <CardContent>
              <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Materials Name"
                      name="name"
                      onChange={handleChange}
                      required
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Price"
                      name="price"
                      type="number"
                      InputProps={{ inputProps: { min: 0, max: 200 } }}
                      onChange={handleChange}
                      required
                      value={values.price}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      fullWidth
                      color="success"
                      label="Date Import"
                      type="date"
                      name="name"
                      onChange={handleChange}
                      required
                      value={values.dateImport}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                          label="Controlled picker"
                          value
                          onChange
                        />
                    </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Calories"
                      name="calories"
                      type="number"
                      placeholder="e.g. 10"
                      InputProps={{ inputProps: { min: 0, max: 200 } }}
                      onChange={handleChange}
                      required
                      value={values.calories}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Color Code"
                      placeholder="e.g. #000000"
                      name="color"
                      type="color"
                      onChange={handleChange}
                      required
                      value={values.color}
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
                <Grid item xs={12} mt={5}>
                    <TextField
                      multiline
                      rows={4}
                      color="success"
                      fullWidth
                      label="Description"
                      name="descs"
                      onChange={handleChange}
                      value={values.descs}
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
