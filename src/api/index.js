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
      return err.response.data;
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
      return err.response.data;
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

export const deleteMaterial = async (id) => {
  return await axios
    .delete(`${baseURL}/api/products/${id}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response.data;
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
      console.log(err);
      return err.response.data.data;
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
export const getAllCupons = async (req, res) => {
  return await axios
    .get(`${baseURL}/api/cupons`, {
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
