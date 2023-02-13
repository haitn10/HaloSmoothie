import { ImageListItem } from "@mui/material";
import moment from "moment";
import Actions from "../../components/Actions";

const products = [
  {
    field: "id",
    headerName: "Product ID",
    width: 100,
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    width: 200,
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
    flex: 1,
    renderCell: (params) => moment(params.row.dateimport).format("YYYY-MM-DD"),
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

export default products;
