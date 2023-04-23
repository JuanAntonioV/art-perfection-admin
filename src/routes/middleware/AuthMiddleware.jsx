import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Guest = ({ children }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    if (isAuth) return <Navigate to={'/dashboard'} />;

    return children;
};

export const Authenticated = ({ children }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuth) return <Navigate to={'/login'} />;

    return children;
};
