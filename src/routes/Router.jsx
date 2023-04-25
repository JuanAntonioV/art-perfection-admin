import { Navigate, Route, Routes } from 'react-router-dom';

// Pages
import LoginPage from '@pages/auth/LoginPage';
import ForgotPasswordPage from '@pages/auth/ForgotPasswordPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import NotFound from '@/pages/NotFound';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import EmployePage from '@/pages/employes/EmployePage';
import HeadPage from '@/pages/heads/HeadPage';
import TeamPage from '@/pages/teams/TeamPage';
import ProfilePage from '@/pages/profiles/ProfilePage';
import TeamDetailPage from '@/pages/teams/TeamDetailPage';
import SettingPage from '@/pages/settings/SettingPage';
import TeamCreatePage from '@/pages/teams/TeamCreatePage';
import EmployeDetailPage from '@/pages/employes/EmployeDetailPage';
import { Authenticated, Guest } from './middleware/AuthMiddleware';
import HeadDetailPage from '@/pages/heads/HeadDetailPage';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'login'} />} />
            <Route
                path='/login'
                element={
                    <Guest>
                        <LoginPage />
                    </Guest>
                }
            />
            <Route
                path='/register'
                element={
                    <Guest>
                        <RegisterPage />
                    </Guest>
                }
            />
            <Route
                path='/forgot-password'
                element={
                    <Guest>
                        <ForgotPasswordPage />
                    </Guest>
                }
            />
            <Route
                path='/reset-password'
                element={
                    <Guest>
                        <ResetPasswordPage />
                    </Guest>
                }
            />

            <Route
                element={
                    <Authenticated>
                        <DashboardLayout />
                    </Authenticated>
                }
            >
                <Route path='dashboard' Component={DashboardPage} />

                {/* Anggota */}
                <Route path='anggota' Component={EmployePage} />
                <Route path='anggota/:id' Component={EmployeDetailPage} />

                {/* Pimpinan */}
                <Route path='pimpinan' Component={HeadPage} />
                <Route path='pimpinan/:id' Component={HeadDetailPage} />

                {/* Tim */}
                {/* <Route path='tim' Component={TeamPage} />
                <Route path='tim/:id' Component={TeamDetailPage} />
                <Route path='tim/create' Component={TeamCreatePage} /> */}

                <Route path='pengaturan' Component={SettingPage} />
                <Route path='profil' Component={ProfilePage} />
            </Route>

            <Route path='*' Component={NotFound} />
        </Routes>
    );
};

export default Router;
