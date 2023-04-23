import Router from './routes/Router';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/themes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './stores/thunks/authThunk';

const App = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        dispatch(getUser(token)).then((res) => {
            if (res.payload.data.status === 401) dispatch(logout(token));
        });
    }, [dispatch]);

    return (
        <ChakraProvider resetCSS theme={theme}>
            <Router />
        </ChakraProvider>
    );
};

export default App;
