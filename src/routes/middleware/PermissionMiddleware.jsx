import { Skeleton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const PermissionMiddleware = ({ children, permisionKey }) => {
    const user = useSelector((state) => state.auth.user);

    if (user && user.permissions) {
        const permission = user?.permissions.find(
            (permission) => permission === permisionKey
        );

        if (permission || permisionKey === 'view dashboard') {
            return children;
        }
    }

    return <Skeleton isLoaded={false}>{children}</Skeleton>;
};

export default PermissionMiddleware;
