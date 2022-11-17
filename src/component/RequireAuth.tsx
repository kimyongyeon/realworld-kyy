import React from 'react';
import { Navigate } from 'react-router-dom';
import User from '../container/user/domain/User';

function RequireAuth({ children }: any) {
  const user = new User();
  const token = user.getToken();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
