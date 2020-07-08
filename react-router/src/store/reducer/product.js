const initialStore = {
  products: [],
};

export const productReducer = (state = initialStore, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
      
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT":
      const updatedProduct = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        } else {
          return product;
        }
      });

      return {
        ...state,
        products: updatedProduct,
      };

      case "DELETE_PRODUCT":
        const newState = state.products.filter(state.products.id !== action.payload.id)
         return {
           ...state,
           products: newState,
         }


    default:
      return state;
  }
};
