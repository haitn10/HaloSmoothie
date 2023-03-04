import moment from "moment";

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
        style={{ width: 166}}
      />
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: "price",
    headerName: "Price",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "dateImport",
    headerName: "Date Import",
    type: "date",
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => moment(params.row.dateimport).format("YYYY-MM-DD"),
  },
  {
    field: "dateExport",
    headerName: "Date Export",
    type: "date",
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => moment(params.row.dateimport).format("YYYY-MM-DD"),
  },
  {
    field: "calories",
    headerName: "calories",
    type: "number",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "color",
    headerName: "Color",
    type: "string",
    align: "center",
    headerAlign: "center",
    flex: 1,
  }
];

export default materials;
