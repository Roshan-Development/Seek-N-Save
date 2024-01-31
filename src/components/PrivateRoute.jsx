import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import { useCookies } from 'react-cookie';

export default function PrivateRoute() {
  const [cookies] = useCookies(['authToken']);
  const loggedIn = !!cookies.authToken;

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
