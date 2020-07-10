const initialStore = {
  myCharts: [],
  id: '',
};

export const chartReducer = (state = initialStore, action) => {
  switch (action.type) {
    case "GET_CHART": {
      return {
        ...state,
        myCharts: action.payload,
      };
    }

    case "GET_ID" : {
      return {
        ...state,
        id: action.payload
      }
    }

    case "ADD_CHART":
      let isEmpty = [];
      let payload = [];
      let items = state.myCharts;

      let id = action.payload.product._id;
      let quantity = action.payload.quantity;

      items.forEach((item) => {
        if (item.product._id === id) {
          payload.push({
            product: action.payload.product,
            quantity: Number(item.quantity) + Number(quantity),
          });
          isEmpty.push("check");
        } else {
          payload.push(item);
        }
      });

      if (isEmpty.length === 0) {
        payload.push({ product: action.payload.product, quantity });
      }

      return {
        ...state,
        myCharts: payload,
      };

    case "DELETE_ITEM_CHART":
      const newChart = state.myCharts.filter(
        (chart) => chart.product._id !== action.id
      );
      console.log(newChart, "checkout")
      return {
        ...state,
        myCharts: newChart,
      };

    case "CHECKOUT":
      const checkoutResult = state.myCharts.filter(
        (chart) => chart.product._id !== action.id
      );

      console.log(checkoutResult, "checkout result")
      return {
        ...state,
        myCharts: checkoutResult,
      };

      case "UPDATE_DEC" : 
      const updateDec = state.myCharts.map((item) => {
        if(item._id === action.payload.itemProductId) {
          return { ...item, quantity: action.payload.itemProductId}
        } else {
          return item
        }
      })

      return {
        ...state,
        myCharts: updateDec
      }

      case "UPDATE_IN":
        const updateIn = state.myCharts.map((item) => {
          if(item._id === action.payload.itemProductId) {
            return { ...items, quantity: action.payload.itemProductId}
          } else {
            return item
          }
        })

        return {
          ...state,
          myCharts: updateIn
        }

    default:
      return state;
  }
};
