import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const Guest = () => {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/dashboard';

    return user ? <Navigate to={from} replace /> : <Outlet />;
};

export const Authenticated = () => {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();

    return user ? (
        <Outlet />
    ) : (
        <Navigate to={'/login'} state={{ from: location }} replace />
    );
};

export const RolePermissions = ({ role }) => {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();

    return user?.role?.includes(role) ? (
        <Outlet />
    ) : user ? (
        <Navigate to={'/dashboard'} replace />
    ) : (
        <Navigate to={'/login'} state={{ from: location }} replace />
    );
};
