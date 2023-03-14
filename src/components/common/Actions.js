import { Create, DeleteForeverOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { message } from "antd";
import { deleteCoupon, deleteMaterial, deleteOffice, deleteProduct, deleteStaff } from "api";

function Actions({ params, setItem, setLoading, setOpen, state, item }) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickOpen = (id) => {
    setLoading(true);
    if (item === 1) {
      setOpen(true);
      setItem(state.products.filter((row) => row.id === id));
    } else if (item === 2) {
      setOpen(true);
      setItem(state.offices.filter((row) => row.id === id));
    } else if (item === 3) {
      setOpen(true);
      setItem(state.materials.filter((row) => row.id === id));
    } else if (item === 4) {
      setOpen(true);
      setItem(state.coupons.filter((row) => row.id === id));
    } else if (item === 5) {
      setOpen(true);
      setItem(state.staffers.filter((row) => row.id === id));
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    if (item === 1) {
      const result = await deleteProduct({ id, token: state.accessToken });
      if (result.statusCode === 200) {
        setLoading(true);
        info("success", result.message);
      } else {
        console.log(result);
        setLoading(true);
        info("error", result.statusText);
      }
      setTimeout(() => setLoading(false), 200);
    } else if (item === 2) {
      const result = await deleteOffice({ id, token: state.accessToken });
      if (result.statusCode === 200) {
        setLoading(true);
        info("success", result.message);
      } else {
        console.log(result);
        setLoading(true);
        info("error", result.message);
      }
      setTimeout(() => setLoading(false), 200);
    } else if (item === 3) {
      const result = await deleteMaterial({ id, token: state.accessToken });
      if (result.statusCode === 200) {
        setLoading(true);
        info("success", result.message);
      } else {
        setLoading(true);
        info("error", result.message);
      }
      setTimeout(() => setLoading(false), 200);
    } else if (item === 4) {
      const result = await deleteCoupon({ id, token: state.accessToken });
      if (result.statusCode === 200) {
        setLoading(true);
        info("success", result.message);
      } else {
        setLoading(true);
        info("error", result.message);
      }
      setTimeout(() => setLoading(false), 200);
    } else if (item === 5) {
      const result = await deleteStaff({ id, token: state.accessToken });
      if (result.statusCode === 200) {
        setLoading(true);
        info("success", result.message);
      } else {
        setLoading(true);
        info("error", result.message);
      }
      setTimeout(() => setLoading(false), 200);
    }
  };

  const info = (status, msg) => {
    messageApi.open({
      type: status,
      content: msg,
    });
  };
  return (
    <>
      {contextHolder}
      <div>
        <Button
          variant="outlined"
          color="info"
          onClick={() => handleClickOpen(params.row.id)}
          sx={{ margin: 1 }}
        >
          <Create />
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteForeverOutlined />
        </Button>
      </div>
    </>
  );
}

export default Actions;
