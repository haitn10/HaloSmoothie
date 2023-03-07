const offices = [
  {
    field: "id",
    headerAlign: "center",
    headerName: "Offices ID",
    width: 90,
    align: "center",
  },
  {
    field: "name",
    headerAlign: "center",
    headerName: "Offices Name",
    flex: 0.5,
  },
  {
    field: "image",
    headerAlign: "center",
    headerName: "Image",
    align: "center",
    width: 200,
    renderCell: (params) => (
      <img
        src={params.row.img}
        alt={`${params.row.name}`}
        style={{ width: 166}}
      />
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: "address",
    headerAlign: "center",
    headerName: "Address",
    flex: 1,
  },
  {
    field: "phone",
    headerAlign: "center",
    headerName: "Phone",
    flex: 0.5,
    align: "center",
  },
];

export default offices;
