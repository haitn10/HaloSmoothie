import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import { Menu as MenuIcon, ArrowDropDownOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { logout } from "../../state";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <Button
            onClick={handleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "none",
              gap: "1rem",
            }}
          >
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: "#4e6c50" }}
              >
                Administrator
              </Typography>
              <Typography fontSize="0.75rem" sx={{ color: "#4e6c50" }}>
                #a123
              </Typography>
            </Box>
            <ArrowDropDownOutlined
              sx={{ color: "#4e6c50", fontSize: "25px" }}
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            sx={{
              verflow: "visible",
              width: "200px",
            }}
          >
            <MenuItem onClick={logOut}>Log Out</MenuItem>
          </Menu>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
