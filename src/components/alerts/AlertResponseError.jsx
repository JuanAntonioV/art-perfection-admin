import { upperFirst } from '@/helpers/TextHelper';
import { Alert, AlertTitle } from '@chakra-ui/react';

const AlertResponseError = ({ status, error, my = 0 }) => {
    return (
        <Alert
            status={'error'}
            display={status === 'failed' ? 'block' : 'none'}
            rounded={'md'}
            fontSize={'sm'}
            my={my}
            textColor={'red.500'}
        >
            <AlertTitle>
                {error?.code !== 500
                    ? upperFirst(error?.message)
                    : upperFirst(error?.error)}
            </AlertTitle>
        </Alert>
    );
};

export default AlertResponseError;
