import React, {useReducer} from 'react';
import CartContext from './CartContext';
import CartReducer from './CartReducer';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  VIEW_CART,
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_ITEMS,
  ADD_ITEMS,
  CLEAR_CART,
} from '../Types';
import {initialState} from '../initialState';

const CartState = ({children}) => {
  const [{showCart, cartItems}, dispatch] = useReducer(
    CartReducer,
    initialState,
  );

  const addToCart = item => {
    let newBasket = [...cartItems];

    const productIndex = newBasket.findIndex(
      cartItem => cartItem.id === item.id,
    );

    if (productIndex >= 0) {
      const match = newBasket.find(cartItem => cartItem.id === item.id);
      newBasket.splice(productIndex, 1, {
        ...match,
        quantity: match.quantity + 1,
      });
    } else {
      newBasket = [...newBasket, {...item, quantity: 1}];
    }

    // console.log({newBasket});

    dispatch({type: ADD_TO_CART, payload: newBasket});
    showMessage({
      message: 'Product Added',
      description: 'Item has been added to the cart',
      type: 'success',
      backgroundColor: '#2d2d2d', // background color
      color: '#ffffff', // text color
    });
  };

  const addItems = item => {
    let newBasket = [...cartItems];

    const productIndex = newBasket.findIndex(
      cartItem => cartItem.id === item.id,
    );

    const match = newBasket.find(cartItem => cartItem.id === item.id);
    newBasket.splice(productIndex, 1, {
      ...match,
      quantity: match.quantity + 1,
    });
    // console.log({newBasket});

    dispatch({type: ADD_ITEMS, payload: newBasket});
  };

  const subItems = item => {
    let newBasket = [...cartItems];

    const productIndex = newBasket.findIndex(
      cartItem => cartItem.id === item.id,
    );

    const match = newBasket.find(cartItem => cartItem.id === item.id);
    newBasket.splice(productIndex, 1, {
      ...match,
      quantity: match.quantity - 1,
    });
    // console.log({newBasket});

    dispatch({type: SUB_ITEMS, payload: newBasket});
  };

  const viewCart = () => {
    dispatch({type: VIEW_CART});
  };

  const removeItem = id => {
    dispatch({type: REMOVE_ITEM, payload: id});
  };

  const clearCart = () => {
    dispatch({type: CLEAR_CART, payload: initialState});
  };

  return (
    <CartContext.Provider
      value={{
        showCart,
        cartItems,
        addToCart,
        subItems,
        addItems,
        viewCart,
        removeItem,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
