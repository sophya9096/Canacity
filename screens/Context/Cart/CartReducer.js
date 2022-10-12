import {
  VIEW_CART,
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_ITEMS,
  ADD_ITEMS,
  CLEAR_CART,
} from '../Types';

const CartReducer = (state, action) => {
  switch (action.type) {
    case VIEW_CART: {
      return {
        ...state,
        showCart: !state.showCart,
      };
    }

    case ADD_TO_CART: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }

    case ADD_ITEMS: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }

    case SUB_ITEMS: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }

    case REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    }

    case CLEAR_CART: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default CartReducer;
// const {cartItems} = initialState;
// const check = cartItems.filter(item => {
//   return item.id !== id;
// });
// if (check) {
//   return dispatch({type: ADD_TO_CART, payload: item});
// } else {
//   alert('Item already Added');
// }
// };
