import Router from './routes/Router';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
});

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Router />
        </ChakraProvider>
    );
};

export default App;
