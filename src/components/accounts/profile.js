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
import { useState } from "react";
import logo from "../../images/logo.png"

export const AccountProfile = ({ info }) => {
  const [values, setValues] = useState(info);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
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
            src={logo}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography gutterBottom variant="h5" align="center">
            {`${values.firstName} ${values.lastName}`}
          </Typography>

          <Typography variant="body2">{values.address}</Typography>
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
            onChange={handleChange}
          />
        </Button>
      </CardActions>
    </Card>
  );
};
