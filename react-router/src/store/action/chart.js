import axios from "./url";

export const getChart = () => {
  return (dispatch) => {
    axios
      .get(`/chart`)
      .then((response) => {
        console.log(response.data.data);
        dispatch({ type: "GET_CHART", payload: response.data.data.items });
        dispatch({ type: "GET_ID", payload: response.data.data._id})
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addChart = (postProduct, id) => {
  return (dispatch) => {
    axios.post(`chart/add/${id}`, postProduct).then((response) => {
      console.log(response.data.data, "response add");
      dispatch({ type: "ADD_CHART", payload: response.data.data });
    });
  };
};

export const deleteItemChart = (id) => {
  return (dispatch) => {
    axios
      .delete(`/chart/delete/${id}`)
      .then((result) => {
        console.log(result, "delete data");
        dispatch({ type: "DELETE_ITEM_CHART", id });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkoutChart = (id, quantity) => {
  return (dispatch) => {
    axios
      .delete(`/chart/checkout/${id}`, { data: { quantity } })
      .then((result) => {
        console.log(result, "checkout data");
        dispatch({ type: "CHECKOUT", id });
        dispatch({ type: "UPDATE_STOCK", payload: { quantity, id } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const decQuantity = (idChart,itemProductId, quantity) => {
  return (dispatch) => {
   axios.put(`/chart/decrement/${idChart}/update/${itemProductId}`,{ data : quantity})
   .then((result) => {
     console.log(quantity, "quantity")
     console.log(itemProductId, "item action")
     dispatch({type: "UPDATE_DEC", payload: { itemProductId, quantity}})
    
   })
 }
};

export const InQuantity = (idChart,itemProductId, quantity) => {
  return (dispatch) => {
   axios.put(`/chart/increament/${idChart}/update/${itemProductId}`,{ data : quantity})
   .then((result) => {
     console.log(quantity, "quantity")
     console.log(itemProductId, "item action")
     dispatch({type: "UPDATE_IN", payload: { itemProductId, quantity}})
    
   })
 }
};
