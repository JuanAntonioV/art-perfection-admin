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

                {/* Employes */}
                <Route path='employes' Component={EmployePage} />
                <Route path='heads/:id' Component={TeamDetailPage} />

                {/* Heads */}
                <Route path='heads' Component={HeadPage} />
                <Route path='heads/:id' Component={TeamDetailPage} />
                <Route path='heads/create' Component={TeamCreatePage} />

                {/* Teams */}
                <Route path='teams' Component={TeamPage} />
                <Route path='teams/:id' Component={TeamDetailPage} />
                <Route path='teams/create' Component={TeamCreatePage} />

                <Route path='settings' Component={SettingPage} />
                <Route path='profiles' Component={ProfilePage} />
            </Route>

            <Route path='*' Component={NotFound} />
        </Routes>
    );
};

export default Router;
