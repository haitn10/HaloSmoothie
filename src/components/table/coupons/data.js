import moment from "moment";

const coupons = [
  {
    field: "id",
    headerName: "Cupon ID",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "code",
    headerName: "Cupon Code",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "exp",
    headerName: "Date Exp",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => moment(params.row.exp).format("YYYY-MM-DD"),
  },
  {
    field: "discount",
    headerName: "Discount",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
];

export default coupons;
