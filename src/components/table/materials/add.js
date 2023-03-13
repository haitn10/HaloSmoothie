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
import { useContext, useEffect, useState } from "react";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { StoreContext } from "store";
import { message } from "antd";
import { addMaterial } from "api";
import { useNavigate } from "react-router-dom";

const material = {
  name: "",
  price: "",
  calories: "",
  color: "#ffffff",
  descs: "",
  image: "",
};

const image = { file: [], filepreview: null };

export const AddMaterial = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();
  const [values, setValues] = useState(material);
  const [images, setImages] = useState(image);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (images.file.length !== 0) {
      const imageRef = ref(storage, `materials/${images.file.name}`);
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
    const result = await addMaterial({ values, token: state.accessToken });
    if (result.statusCode === 200) {
      setLoading(false);
      info("success", result.message);
      setTimeout(() => navigate("/materials"), 1000);
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
          backgroundColor: `${values.color}`,
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
                  <Grid item md={12} gap={2} display="flex">
                    <TextField
                      fullWidth
                      color="success"
                      label="Materials Name"
                      name="name"
                      required
                      onChange={handleChange}
                      value={values.name}
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
                      value={values.color}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Price"
                      name="price"
                      required
                      type="number"
                      InputProps={{ inputProps: { min: 1000 } }}
                      onChange={handleChange}
                      value={values.price}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      color="success"
                      label="Calories"
                      name="calories"
                      type="number"
                      required
                      placeholder="e.g. 10"
                      InputProps={{ inputProps: { min: 0, max: 280 } }}
                      onChange={handleChange}
                      value={values.calories}
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
