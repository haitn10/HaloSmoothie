import {
  ImageListItem,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import logo from "../../../images/logo.png";

function renderRow(props) {
  const {style, index, data} = props;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ImageListItem
          children={<img src={data[index].img ? data[index].img : logo} alt="" />}
          sx={{ width: 30, height: 30, marginRight: 1 }}
        />
        <ListItemText primary={data[index].name} />
      </ListItemButton>
    </ListItem>
  );
}

export default renderRow;
