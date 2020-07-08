import axios from './url'

export const getChart = () => {
  return (dispatch) => {
    axios.get(`/chart`)
    .then((response) => {
      dispatch({ type: "GET_CHART", payload: response.data.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const addChart = (postProduct, id) => {
  return (dispatch) => {
    axios.post(`chart/add/${id}`, postProduct)
    .then((response) => {
      console.log(response, "response add")
      dispatch({ type: "ADD_CHART", payload: response.data.data})
    })
  }
}

export const deleteItemChart = (id) => {
  return (dispatch) => {
    axios.delete(`/chart/delete/${id}`)
    .then((result) => {
      console.log(result,"delete data")
      dispatch({type: "DELETE_ITEM_CHART", payload: result.data.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const checkoutChart = (id, quantity) => {
  return (dispatch) => {
    axios.delete(`/chart/checkout/${id}`, { data: {quantity}})
    .then((result) => {
      console.log(result, "checkout data")
      dispatch({type: "CHECKOUT", payload: result.data.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

