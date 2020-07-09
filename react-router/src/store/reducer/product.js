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
      const newState = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      // const newState = state.products.map((product) => {
      //   if(product.id === action.payload.id) {
      //     return product
      //   }
      // })
      return {
        ...state,
        products: newState,
      };

    case "UPDATE_STOCK":
      const quantityDec = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, stock: product.stock - action.payload.quantity };
        } else {
          return product;
        }
      });

      return {
        ...state,
        products : quantityDec
      }

    default:
      return state;
  }
};
