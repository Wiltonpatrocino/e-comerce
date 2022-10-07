import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';

export const cartProducts = createSlice({
		name: 'cartProducts',
    initialState: [],
    reducers: {
        setCartProducts: (state, action) => action.payload
    }
})

export const getCartProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true))
  return axios
  .get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())

  .then(res => dispatch(setCartProducts(res.data.data.cart.products)))

  .catch(error => console.log(error.response))

  .finally(() => dispatch(setIsLoading(false)))
}


export const addCartThunk = (product) => (dispatch) => {
  
  dispatch(setIsLoading(true))
  
  return axios
  .post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig())

  .then(() => dispatch(getCartProductsThunk()))

  .finally(() => dispatch(setIsLoading(false)))
}

export const checkoutThunk = () => (dispatch) => {
  
  dispatch(setIsLoading(true))
  
  return axios
  .post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())

  .then(() => dispatch(setCartProducts([])))

  .finally(() => dispatch(setIsLoading(false)))
}


export const { setCartProducts } = cartProducts.actions;

export default cartProducts.reducer;