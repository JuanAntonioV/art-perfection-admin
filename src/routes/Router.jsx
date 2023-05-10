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
                <Route
                    path='employee'
                    element={
                        <RolePermissions role={['admin', 'head']}>
                            <EmployePage />
                        </RolePermissions>
                    }
                />
                <Route
                    path='employee/:id'
                    element={
                        <RolePermissions role={['admin', 'head']}>
                            <EmployeDetailPage />
                        </RolePermissions>
                    }
                />

                {/* Pimpinan */}
                <Route
                    path='head'
                    element={
                        <RolePermissions role={['admin']}>
                            <HeadPage />
                        </RolePermissions>
                    }
                />
                <Route
                    path='head/:id'
                    element={
                        <RolePermissions role={['admin']}>
                            <HeadDetailPage />
                        </RolePermissions>
                    }
                />

                {/* Tim */}
                <Route path='teams' Component={TeamPage} />
                <Route path='teams/:id' Component={TeamDetailPage} />
                <Route
                    path='teams/create'
                    element={
                        <RolePermissions role={['admin']}>
                            <TeamCreatePage />
                        </RolePermissions>
                    }
                />

                <Route
                    path='settings'
                    element={
                        <RolePermissions role={['admin']}>
                            <SettingPage />
                        </RolePermissions>
                    }
                />

                <Route path='profile' Component={ProfilePage} />

                <Route
                    path='analytics'
                    element={
                        <RolePermissions role={['admin']}>
                            <AnalyticPage />
                        </RolePermissions>
                    }
                />

                <Route path='coming-soon' Component={ComingSoonPage} />
            </Route>

            <Route path='not-found' Component={NotFound} />
            <Route path='*' element={<Navigate to={'not-found'} />} />
        </Routes>
    );
};

export default Router;
