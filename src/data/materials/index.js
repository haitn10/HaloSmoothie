import { ImageListItem } from "@mui/material";
import moment from "moment";
import Actions from "../../components/Actions";

const materials = [
  {
    field: "id",
    headerName: "Materials ID",
    width: 100,
  },
  {
    field: "name",
    headerName: "Materials Name",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => <ImageListItem src={params.row.photoURL} />,
    sortable: false,
    filterable: false,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    editable: true,
  },
  {
    field: "dateimport",
    headerName: "Date Import",
    type: "date",
    flex: 1,
    renderCell: (params) => moment(params.row.dateimport).format("YYYY-MM-DD"),
  },
  {
    field: "dateeport",
    headerName: "Date Import",
    type: "date",
    flex: 1,
    renderCell: (params) => moment(params.row.dateimport).format("YYYY-MM-DD"),
  },
  {
    field: "category",
    headerName: "Category",
    type: "singleSelect",
    valueOptions: ['xanh', 'vàng', 'đỏ'],
    flex: 1,
    editable: true,
  },
  {
    field: "color",
    headerName: "Color",
    type: "singleSelect",
    valueOptions: ['xanh', 'vàng', 'đỏ'],
    flex: 1,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.7,
    type: "boolean",
    editable: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.7,
    type: "actions",
    renderCell: (params) => <Actions {...{ params }} />,
  },
];

export default materials;
