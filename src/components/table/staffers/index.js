import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { StoreContext, actions } from "store";
import { getAllStaffers } from "api";
import { useState } from "react";
import Details from "./details";
import Actions from "components/common/Actions";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Staffers = ({ value }) => {
  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  //Get all staff
  useEffect(() => {
    async function fetchMyAPI() {
      const stafferList = await getAllStaffers({ token: state.accessToken });
      dispatch(actions.setStaffers(stafferList));
    }
    fetchMyAPI();
  }, [loading, open, dispatch, state.accessToken]);

  console.log(state.staffers);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 200,
      align: "center",
      sortable: false,
      menuable: false,
      renderCell: (params) => {
        return (
          <Actions
            params={params}
            setItem={setItem}
            setLoading={setLoading}
            setOpen={setOpen}
            state={state}
            item={5}
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
            onClick={() => navigate("/staffers/add")}
          >
            <Add /> Add Staff
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
            rows={state.staffers}
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

export default Staffers;
