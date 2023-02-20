import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "./DataGridCustomToolbar";

const data = [
  {
    id: 1,
    name: "Snow",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 2,
    name: "Anow",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 3,
    name: "bnow",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 4,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 5,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 6,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 7,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 8,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 9,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 10,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 11,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "true",
  },
  {
    id: 12,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "false",
  },
  {
    id: 13,
    name: "now",
    image: "Jon",
    prices: 35,
    dateimport: "11/2/2023",
    status: "false",
  },
];

const Data = ({ value }) => {
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  return (
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
          rows={data}
          columns={value}
          getRowId={(row) => row.id}
          pagination
          rowsPerPageOptions={[10, 20, 30]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          
        />
      </Box>
    </Box>
  );
};

export default Data;
