import { upperFirst } from '@/helpers/TextHelper';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const AlertResponseInfo = ({ status, info }) => {
    return (
        <Alert
            status={'info'}
            display={status === 'success' ? 'flex' : 'none'}
            rounded={'md'}
            fontSize={'sm'}
            textColor={'blue.500'}
        >
            <AlertIcon />
            <AlertTitle>{info}</AlertTitle>
        </Alert>
    );
};

export default AlertResponseInfo;
