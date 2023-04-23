import Router from './routes/Router';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/themes';

const App = () => {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <Router />
        </ChakraProvider>
    );
};

export default App;
