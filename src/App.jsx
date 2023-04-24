import Router from './routes/Router';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/themes';
import { useEffect } from 'react';
import { getUser, logout } from './stores/thunks/authThunk';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from './stores/reducers/authReducer';

const App = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        dispatch(getUser(token)).then((res) => {
            if (res.payload.code === 401) dispatch(logoutAction(token));
        });
    }, [dispatch]);

    return (
        <ChakraProvider resetCSS theme={theme}>
            <Router />
        </ChakraProvider>
    );
};

export default App;
