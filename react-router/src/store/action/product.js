import axios from "./url";

export const getProduct = () => {
  return (dispatch) => {
    axios
      .get(`/product`)
      .then((response) => {
        dispatch({ type: "GET_PRODUCTS", payload: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addProduct = (newProduct) => {
  return (dispatch) => {
    axios
      .post(`/product/add`, newProduct)
      .then((result) => {
        console.log(result.data.data, "result add");
        dispatch({ type: "ADD_PRODUCTS", payload: result.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateProduct = (dataUpdate, id) => {
  return (dispatch) => {
    axios
      .put(`/product/update/${id}`, dataUpdate)
      .then((result) => {
        console.log(result.data, "update");
        dispatch({ type: "UPDATE_PRODUCT", payload: result.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteProduct = (_id) => {
  return(dispatch) => {
    axios
      .delete(`/product/delete/${_id}`)
      .then((result) => {
        console.log(result.data.data, "delete data")
        dispatch({type: "DELETE_PRODUCT", payload: result.data.data})
      })
      .catch((err) => {
        console.log(err);
      });
  }
}