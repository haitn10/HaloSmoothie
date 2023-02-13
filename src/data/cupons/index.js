import Actions from "../../components/Actions";

const cupons = [
  {
    field: "id",
    headerName: "Cupon ID",
    flex: 1,
  },
  {
    field: "Code",
    headerName: "Cupon Code",
    flex: 1,
  },
  {
    field: "exp",
    headerName: "Date Exp",
    flex: 1,
  },
  {
    field: "discount",
    headerName: "Discount",
    flex: 1,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    sortable: true,
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

export default cupons;
