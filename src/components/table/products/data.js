const products = [
  {
    field: "id",
    headerName: "Product ID",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "image",
    headerName: "Image",
    width: 200,
    renderCell: (params) => (
      <img
        src={params.row.img}
        alt={`${params.row.name}`}
        style={{ width: 100 }}
      />
    ),
    sortable: false,
    filterable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "salePrice",
    headerName: "Sale Price",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "categoryId",
    headerName: "Category",
    renderCell: (params) => {
      if (params.row.categoryId === 1) return "Juice";
      if (params.row.categoryId === 2) return "Smoothy";
    },
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
];

export default products;
