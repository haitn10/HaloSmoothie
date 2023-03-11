import axios from "axios";

export const baseURL = "https://api-halosmoothie.azurewebsites.net";

export const login = async (req, res, next) => {
  return await axios
    .post(`${baseURL}/api/auth/staff`, req)
    .then((response) => {
      sessionStorage.setItem("token", JSON.stringify(response.data));
      return response;
    })
    .catch((err) => {
      return err.response;
    });
};

//PRODUCTS API
export const getAllProducts = async (req, res) => {
  return await axios
    .get(`${baseURL}/api/products`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getProductsById = async (req, res) => {
  return await axios
    .get(`${baseURL}/api/products/${req.id}`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const addProduct = async (req, res) => {
  return await axios
    .post(`${baseURL}/api/products`, req.values, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};
export const updateProduct = async (req, res) => {
  return await axios
    .put(`${baseURL}/api/products/${req.id}`, req.values, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteProduct = async (req, res) => {
  return await axios
    .delete(`${baseURL}/api/products/${req.id}`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

///METERIALS API
export const getAllMaterials = async (req, res) => {
  return await axios
    .get(`${baseURL}/api/materials`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const addMaterial = async (req, res) => {
  return await axios
    .post(`${baseURL}/api/materials`, req.values, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const updatMaterial = async (req, res) => {
  return await axios
    .put(`${baseURL}/api/materials/${req.id}`, req.values, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteMaterial = async (req, res) => {
  return await axios
    .delete(`${baseURL}/api/materials/${req.id}`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

////OFFICES API
export const getAllOffices = async (req, res) => {
  return await axios
    .get(`${baseURL}/api/offices`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getOfficeById = async (req, res) => {
  return await axios
    .get(`${baseURL}/api/offices/${req.id}`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};


export const addOffice = async (req, res) => {
  return await axios
    .post(`${baseURL}/api/offices`, req.values, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const editOffice = async (req, res) => {
  return await axios
    .put(`${baseURL}/api/offices/${req.id}`, req.values, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
};

export const deleteOffice = async (req, res) => {
  return await axios
    .delete(`${baseURL}/api/offices/${req.id}`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

//CATEGORY API
export const getCategories = async (req, res) => {
  return await axios
    .get(`${baseURL}/api/category`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

//CUPONS API
export const getAllCoupons = async (req, res) => {
  return await axios
    .get(`${baseURL}/api/coupon`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const addCoupon = async (req, res) => {
  return await axios
    .post(`${baseURL}/api/coupon`, req.values, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const editCoupon = async (req, res) => {
  return await axios
    .put(`${baseURL}/api/coupon/${req.id}`, req.values, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteCoupon = async (req, res) => {
  return await axios
    .delete(`${baseURL}/api/coupon/${req.id}`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

//MENUS API
export const getAllMenus = async (req, res) => {
  return await axios
    .get(`${baseURL}/api/menus`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const addMenu = async (req, res) => {
  return await axios
    .post(`${baseURL}/api/menus`, req.values, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteMenu = async (req, res) => {
  return await axios
    .delete(`${baseURL}/api/menus/${req.id}`, {
      headers: {
        Authorization: "Bearer " + req.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};