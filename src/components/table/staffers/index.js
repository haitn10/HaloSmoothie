import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import {
  getAllStaffers,
} from "api";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext, actions } from "store";
import Details from "./details";

const Users = ({ value }) => {
  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);

  //Get all products
  useEffect(() => {
    async function fetchMyAPI() {
      const userList = await getAllStaffers({ token: state.accessToken });
      dispatch(actions.setStaffers(userList));
    }
    fetchMyAPI();
  }, [open]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 200,
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            color="error"
            // onClick={() => handleDelete(params.row.id)}
          >
            <DeleteForeverOutlined />
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {item ? (
        <Details
          item={item[0]}
          open={open}
          setOpen={setOpen}
          setItem={setItem}
          state={state}
        />
      ) : (
        ""
      )}
      <Box m="1.0rem 2.0rem">
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
              backgroundColor: "#fff",
              color: "#10654e",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#ffffff",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#ffffff",
              color: "#10654e",
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: '#ffffff" !important',
            },
          }}
        >
          <DataGrid
            rows={state.products}
            columns={value.concat(actionColumn)}
            pageSize={10}
            rowHeight={100}
            rowsPerPageOptions={[10]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Users;
