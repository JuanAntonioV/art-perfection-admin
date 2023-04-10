import { Route, Routes } from 'react-router-dom';

// Pages
import HomePage from '../pages/HomePage';

const Router = () => {
    return (
        <Routes>
            <Route path='/' Component={HomePage} />
        </Routes>
    );
};

export default Router;
