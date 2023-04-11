import { Navigate, Route, Routes } from 'react-router-dom';

// Pages
import LoginPage from '@pages/auth/LoginPage';
import ForgotPasswordPage from '@pages/auth/ForgotPasswordPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import NotFound from '@/pages/NotFound';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'login'} />} />
            <Route path='/login' Component={LoginPage} />
            <Route path='/register' Component={RegisterPage} />
            <Route path='/forgot-password' Component={ForgotPasswordPage} />
            <Route path='/reset-password' Component={ResetPasswordPage} />
            <Route path='/dashboard' Component={DashboardLayout}>
                <Route index Component={DashboardPage} />
            </Route>

            <Route path='*' Component={NotFound} />
        </Routes>
    );
};

export default Router;
