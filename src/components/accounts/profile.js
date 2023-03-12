import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../firebase";

export const AccountProfile = ({ info, setValues }) => {
  const [images, setImages] = useState({ file: [], filepreview: null });

  useEffect(() => {
    if (images.file.length !== 0) {
      const imageRef = ref(storage, `profile/${images.file.name}`);
      uploadBytes(imageRef, images.file).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setValues({ ...info, img: url });
        });
      });
    }
  }, [images]);

  const handleChangeImage = (event) => {
    setImages({
      ...images,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  return (
    <Card sx={{ borderRadius: "24px", color: "#10654E" }}>
      <CardContent sx={{ padding: "32px" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={images.filepreview !== null ? images.filepreview : info.image}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          {/* {images.filepreview !== null ? (
            <Typography variant="p" color="red"></Typography>
          ) : null} */}

          <Typography gutterBottom variant="h5" align="center">
            {`${info.firstName} ${info.lastName}`}
          </Typography>

          <Typography variant="body2" align="center">
            {info.address}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          sx={{ color: "#10654E" }}
          fullWidth
          variant="text"
          component="label"
        >
          Change Image
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            name="image"
            onChange={handleChangeImage}
          />
        </Button>
      </CardActions>
    </Card>
  );
};
