import { Avatar, Typography } from "@mui/material";

const staffers = [
  {
    field: `firstName`,
    headerName: "User Name",
    flex: 1.25,
    renderCell: (params) => (
      <>
        <Avatar
          src={params.row.img}
          alt={`${params.row.name}`}
          style={{ width: 40, height: 40, margin: 8 }}
        />
        <Typography>
          {params.row.firstName} {params.row.lastName}
        </Typography>
      </>
    ),
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.25,
    headerAlign: "center",
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 0.7,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "office",
    headerName: "Office",
    flex: 1,
    renderCell: (params) => {
      if (params.row.office.name === null || params.row.office.name === "") {
        return "";
      } else return params.row.office.name;
    },
    align: "center",
    headerAlign: "center",
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
    renderCell: (params) => params.row.role.name,
    align: "center",
    headerAlign: "center",
  },
];

export default staffers;
