import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./AuthForm";
import Account from "./Account";
import Products from "./Products";
import Orders from "./Orders";
import { me } from "../features/authSlice";
import SingleProduct from "./SingleProduct";
import { fetchProductsAsync } from "../features/productsSlice";
import Users from "./Users";
import AdminProducts from "./AdminProducts";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import Cart from "./Cart";
import GuestCart from "./GuestCart";
import Profile from "./Profile";
import Checkout from "./Checkout";
import { selectCartProduct } from "../features/cartProductSlice";
import { fetchCartAsync } from "../features/cartSlice";
import OrderComplete from "./OrderComplete";
import OrderDetail from "./OrderDetail";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.admin);
  const userId = useSelector((state) => state.auth.me.id);
  const cartProduct = useSelector(selectCartProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(fetchProductsAsync());
    if (isLoggedIn) {
      dispatch(fetchCartAsync(userId));
    }
  }, [dispatch, userId, cartProduct.quantity]);

  return (
    <div>
      {(() => {
        if (isLoggedIn && !isAdmin) {
          return (
            <Routes>
              <Route path="/*" element={<Account userId={userId} />} />
              <Route path="/products" element={<Products userId={userId}/>} />
              <Route path="/products/:productId" element={<SingleProduct name='singleProduct' />} />
              <Route path="/account" element={<Account userId={userId} />} />
              <Route path="/account/orders" element={<Orders />} />
              <Route path="/account/orders/:orderId" element={<OrderDetail />} />
              <Route path="/users/:userId" element={<Profile userId={userId} />} />
              <Route path="/account/cart" element={<Cart userId={userId} />} />
              <Route path="/account/cart/:productId" element={<SingleProduct name='cartProduct' />} />
              <Route path="/account/cart/checkout" element={<Checkout />} />
              <Route path="/order-complete" element={<OrderComplete />}/>
            </Routes>
          );
        } else if (isLoggedIn && isAdmin) {
          return (
            <Routes>
              <Route path="/*" element={<Products />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/products/:productId" element={<EditProduct />} />
              <Route path="/admin/products/add" element={<AddProduct />} />
            </Routes>
          );
        } else {
          return (
            <Routes>
              <Route path="/*" element={<Products />} />
              <Route
                path="/login"
                element={<AuthForm name="login" displayName="Login" />}
              />
              <Route
                path="/signup"
                element={<AuthForm name="signup" displayName="Sign Up" />}
              />
              <Route path="/products" element={<Products />} />
              <Route path="/guestCart" element={ <GuestCart /> } />
              <Route path="/products/:productId" element={<SingleProduct name='singleProduct' />} />
            </Routes>
          );
        }
      })()}
         </div>
  );
};

export default AppRoutes;
