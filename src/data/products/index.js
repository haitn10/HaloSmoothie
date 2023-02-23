const products = [
  {
    field: "id",
    headerName: "Product ID",
    width: 100,
    align: "center"
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
    renderCell: (params) => <img src={params.row.img} alt={`${params.row.name}`} style={{width:100}}/>,
    sortable: false,
    filterable: false,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
  },
  {
    field: "salePrice",
    headerName: "Sale Price",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    renderCell: (params) => params.row.category.name,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.7,
    type: "boolean",
  },
];

export default products;
