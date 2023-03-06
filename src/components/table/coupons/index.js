import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { getAllCoupons } from "api";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext, actions } from "store";
import Actions from "components/common/Actions";
import Details from "./details";

const Coupons = ({ value }) => {
  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  //Get all materials
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getAllCoupons({ token: state.accessToken });
      dispatch(actions.setCoupons(response));
    }
    fetchMyAPI();
  }, [open, loading]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Actions
            params={params}
            setItem={setItem}
            setLoading={setLoading}
            setOpen={setOpen}
            state={state}
            item={4}
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
            onClick={(e) => navigate("/coupons/add")}
          >
            <Add /> New COUPONS
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
            rows={state.coupons}
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

export default Coupons;
