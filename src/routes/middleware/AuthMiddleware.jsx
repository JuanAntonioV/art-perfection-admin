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

export const RolePermissions = ({ children, role }) => {
    const user = useSelector((state) => state.auth.user);

    const canView = role.includes(user.role);

    if (canView) return children;

    return <Navigate to={'/not-found'} />;
};
