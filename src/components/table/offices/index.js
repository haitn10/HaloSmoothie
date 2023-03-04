import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { getAllOffices } from "api";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext, actions } from "store";
import Details from "./details";
import Actions from "components/common/Actions";

const Offices = ({ value }) => {
  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  //Get all offices
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getAllOffices({ token: state.accessToken });
      dispatch(actions.setOffices(response));
    }
    fetchMyAPI();
  }, [open, loading]);

  const actionColumn = [
    {
      field: "action",
      headerAlign: "center",
      headerName: "Action",
      flexDirection: "column",
      width: 200,
      align: "center",
      renderCell: (params) => {
        return (
          <Actions
            params={params}
            setItem={setItem}
            setLoading={setLoading}
            setOpen={setOpen}
            state={state}
            item={2}
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
            onClick={(e) => navigate("/offices/add")}
          >
            <Add /> New Offices
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
            rows={state.offices}
            columns={value.concat(actionColumn)}
            rowHeight={100}
            rowsPerPageOptions={[10, 20]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Offices;
