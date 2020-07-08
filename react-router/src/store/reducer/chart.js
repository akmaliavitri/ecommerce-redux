const initialStore = {
  myCharts: [],
};

export const chartReducer = (state = initialStore, action) => {
  switch (action.type) {
    case "GET_CHART": {
      return {
        ...state,
        myCharts: action.payload,
      };
    }

    case "ADD_CHART":
      return {
        ...state,
        myCharts: [...state.myCharts.items, action.payload],
      };

    case "DELETE_ITEM_CHART":
      const newChart = state.myCharts.filter(
        state.myCharts.items.product.id === action.payload.id
      );
      return {
        ...state,
        myCharts: newChart,
      };

      case "CHECKOUT": 
      const checkoutResult = state.myCharts.items.product.map((item) => {
        if(item.id === action.payload.id) {
          return action.payload
        } else {
          return item
        }
      })

      return {
        ...state,
        myCharts: checkoutResult
      }

    default:
      return state;
  }
};
