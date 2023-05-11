import { Navigate, Route, Routes } from 'react-router-dom';
import {
    Authenticated,
    Guest,
    RolePermissions,
} from './middleware/AuthMiddleware';

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
import HeadDetailPage from '@/pages/heads/HeadDetailPage';
import AnalyticPage from '@/pages/analytics/AnalyticPage';
import ComingSoonPage from '@/pages/ComingSoonPage';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'login'} />} />

            <Route element={<Guest />}>
                <Route path='/login' Component={LoginPage} />
                <Route path='/register' Component={RegisterPage} />
                <Route path='/forgot-password' Component={ForgotPasswordPage} />
                <Route path='/reset-password' Component={ResetPasswordPage} />
            </Route>

            <Route element={<Authenticated />}>
                <Route Component={DashboardLayout}>
                    <Route path='dashboard' Component={DashboardPage} />

                    {/* Anggota */}
                    <Route
                        element={<RolePermissions role={['admin', 'head']} />}
                    >
                        <Route path='employee' Component={EmployePage} />
                        <Route
                            path='employee/:id'
                            Component={EmployeDetailPage}
                        />
                    </Route>

                    {/* Pimpinan */}
                    <Route element={<RolePermissions role={['admin']} />}>
                        <Route path='head' Component={HeadPage} />
                        <Route path='head/:id' Component={HeadDetailPage} />
                    </Route>

                    {/* Tim */}
                    <Route path='teams' Component={TeamPage} />
                    <Route path='teams/:id' Component={TeamDetailPage} />

                    <Route element={<RolePermissions role={['admin']} />}>
                        <Route path='teams/create' Component={TeamCreatePage} />

                        <Route path='settings' Component={SettingPage} />

                        <Route path='analytics' Component={AnalyticPage} />
                    </Route>

                    <Route path='profile' Component={ProfilePage} />

                    <Route path='coming-soon' Component={ComingSoonPage} />
                </Route>
            </Route>

            <Route path='not-found' Component={NotFound} />
            <Route path='*' element={<Navigate to={'not-found'} />} />
        </Routes>
    );
};

export default Router;
