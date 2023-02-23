import React from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  IconButton,
  List,
  ListItem,
  Slide,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { API } from "api";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Add, Close } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Data = ({ value }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(true);
  const [item, setItem] = useState(null);

  useEffect(() => {
    API.get("/products").then((item) => {
      if (state) {
        setRows(item.data);
      }
      setState(false);
    });
  }, [rows]);

  const handleEdit = async (e) => {
    // const data = await API.post(`/products/${e.id}`);
    console.log(e);
  };

  const handleAdd = () => {
    navigate("/products/add");
  };

  const handleClickOpen = (id) => {
    setItem(rows.filter((row) => row.id === id));
    setOpen(true);
  };

  const handleClose = () => {
    setItem(null);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    const data = await API.delete(`/products/${id}`);
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="outlined"
              color="info"
              onClick={() => handleClickOpen(params.row.id)}
              sx={{ margin: 1 }}
            >
              View
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Box m="1.0rem 2.0rem">
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 30 }}>
        <Button color="success" variant="outlined" onClick={(e) => handleAdd()}>
          <Add /> Add Product
        </Button>
      </div>
      {item ? (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <form>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Product Details
                </Typography>
                <Button
                  autoFocus
                  color="success"
                  variant="contained"
                  onSubmit={(e) => handleEdit(e)}
                >
                  Save
                </Button>
              </Toolbar>
            </AppBar>

            <Grid justifyContent="center" display="flex" mt={8}>
              <Box alignItems="center" display="flex">
                <img
                  src={item[0].img}
                  alt={item[0].name}
                  style={{ maxWidth: 300, maxHeight: 300, marginRight: 20 }}
                />
              </Box>
              <Card>
                <List sx={{ width: 400, margin:5}}>
                  <ListItem>
                    <TextField
                      fullWidth
                      label="Product Name"
                      name="name"
                      value={item[0].name}
                      onChange={(e) => e.target.value}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      fullWidth
                      label="Price"
                      name="price"
                      value={item[0].price}
                      onChange={(e) => e.target.value}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      fullWidth
                      label="Sale Price"
                      name="salePrice"
                      value={item[0].salePrice}
                      onChange={(e) => e.target.value}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      fullWidth
                      label="Category"
                      name="category"
                      value={item[0].category.name}
                      onChange={(e) => e.target.value}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      fullWidth
                      label="Calo"
                      name="calories"
                      value={item[0].calories}
                      onChange={(e) => e.target.value}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      fullWidth
                      name="img"
                      type="file"
                      onChange={(e) => e.target.value}
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </form>
        </Dialog>
      ) : (
        ""
      )}
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={value.concat(actionColumn)}
          pageSize={10}
          rowHeight={100}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default Data;
