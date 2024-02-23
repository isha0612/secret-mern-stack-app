import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from "../Context";

function PrivateRoute({ children }) {
    const { isAuthenticated } = useUser();
    return isAuthenticated === true ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;