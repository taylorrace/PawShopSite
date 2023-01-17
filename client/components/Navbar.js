import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div id='header'>
      <h1 id='shop-title'>The Paw Shop</h1>
      <nav>
        {(() => {
          if(isLoggedIn && !isAdmin) {
            return (
            <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/products' className='nav-link'>Shop</Link>
            <Link to="/account" className='nav-link'>Account</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
            )
          } else if(isLoggedIn && isAdmin) {
            return (
              <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/admin/products' className='nav-link'>Products</Link>
            <Link to="/admin/users" className='nav-link'>Users</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
            )
          } else {
            return (
              <div>
            {/* The navbar will show these links before you log in */}
            <Link to='/products' className='nav-link'>Shop</Link>
            <Link to="/login" className='nav-link'>Login</Link>
            <Link to="/signup" className='nav-link'>Sign Up</Link>

            {/* conditional for showing guestCart vs Cart tbd... */}
            <Link to="/guestCart" className='nav-link'>Cart</Link>

          </div>
            )
          }
        })()}
      </nav>
    </div>
  );
};

export default Navbar;
