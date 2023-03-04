import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { getAllCupons } from "api";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext, actions } from "store";
import Actions from "components/common/Actions";
import Details from "./details";

const Cupons = ({ value }) => {
  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);

  //Get all materials
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getAllCupons({ token: state.accessToken });
      console.log(response);
      dispatch(actions.setMaterials(response));
    }
    fetchMyAPI();
  }, [open]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Actions
            params={params}
            setItem={setItem}
            setOpen={setOpen}
            state={state}
            items={3}
          />
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
        />
      ) : (
        ""
      )}
      <Box m="1.0rem 2.0rem">
        <div
          style={{ display: "flex", justifyContent: "flex-end", margin: 30 }}
        >
          <Button
            color="success"
            variant="outlined"
            onClick={(e) => navigate("/products/add")}
          >
            <Add /> New Materials
          </Button>
        </div>

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
            rows={state.materials}
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

export default Cupons;
