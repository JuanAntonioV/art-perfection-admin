import { Navigate, Route, Routes } from 'react-router-dom';

// Pages
import LoginPage from '@pages/auth/LoginPage';
import ForgotPasswordPage from '@pages/auth/ForgotPasswordPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import NotFound from '@/pages/NotFound';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import UserPage from '@/pages/users/UserPage';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'login'} />} />
            <Route path='/login' Component={LoginPage} />
            <Route path='/register' Component={RegisterPage} />
            <Route path='/forgot-password' Component={ForgotPasswordPage} />
            <Route path='/reset-password' Component={ResetPasswordPage} />
            <Route Component={DashboardLayout}>
                <Route path='dashboard' Component={DashboardPage} />
                <Route path='users' Component={UserPage} />
            </Route>

            <Route path='*' Component={NotFound} />
        </Routes>
    );
};

export default Router;
