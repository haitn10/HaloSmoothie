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
    width: 150,
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
    headerName: "Price (VND/glass)",
    flex: 1,
    renderCell: (params) => (
      Intl.NumberFormat("vi-VN").format(params.row.price)
    ),
    headerAlign: "center",
    align: "center",
  },
  {
    field: "salePrice",
    headerName: "Sale Price (VND/glass)",
    flex: 1,
    renderCell: (params) => (
      Intl.NumberFormat("vi-VN").format(params.row.salePrice)
    ),
    headerAlign: "center",
    align: "center",
  },
  {
    field: "categoryId",
    headerName: "Category",
    renderCell: (params) => (params.row.category.name),
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
];

export default products;
