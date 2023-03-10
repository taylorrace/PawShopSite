import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/authSlice';
import singleProductReducer from '../features/singleProductSlice.js';
import productsReducer from '../features/productsSlice';
import usersReducer from '../features/usersSlice';
import cartReducer from '../features/cartSlice';
import singleUserReducer from '../features/singleUserSlice'
import cartProductReducer from '../features/cartProductSlice';
import ordersReducer from '../features/ordersSlice';
import orderProductsReducer from '../features/orderProductsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductReducer,
    products: productsReducer,
    users: usersReducer,
    cart: cartReducer,
    singleUser: singleUserReducer,
    cartProduct: cartProductReducer,
    orders: ordersReducer,
    orderProducts: orderProductsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/authSlice';
