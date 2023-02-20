import Actions from "../../components/chart/Actions";

const users = [
  {
    field: "Id",
    headerName: "User ID",
    flex: 0.7,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "image",
    headerName: "Avatar",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
  },
  {
    field: "Office",
    headerName: "Office",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    type: "boolean",
    flex: 0.5,
  },
  {
    field: "actions",
    headerName: "Actions",
    type: "boolean",
    flex: 0.7,
    renderCell: (params) => <Actions {...{ params }} />,
  },
];

export default users;
