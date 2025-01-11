import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from '../Pages/Home/Home';

const PrivateRoute = () => {
  const token = Cookies.get('token');
  return (
    token ? <Home/> : <Navigate to="/login" />
  );
};

export default PrivateRoute;