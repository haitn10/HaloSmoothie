import { Box, Tooltip } from "@mui/material";
const materials = [
  {
    field: "id",
    headerName: "Materials ID",
    align: "center",
    headerAlign: "center",
    width: 100,
  },
  {
    field: "name",
    headerName: "Materials Name",
    align: "center",
    headerAlign: "center",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <img
        src={params.row.img}
        alt={`${params.row.name}`}
        style={{ width: 120 }}
      />
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: "price",
    headerName: "Price (VND/100g)",
    align: "center",
    renderCell: (params) => (
      Intl.NumberFormat("vi-VN").format(params.row.price)
    ),
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "calories",
    headerName: "Calo (calo/100g)",
    type: "number",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "color",
    headerName: "Color",
    renderCell: (params) => (
      <Tooltip title={params.row.color}>
        <Box bgcolor={params.row.color} sx={{ height: 20, width: 60 }} />
      </Tooltip>
    ),
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
];

export default materials;
