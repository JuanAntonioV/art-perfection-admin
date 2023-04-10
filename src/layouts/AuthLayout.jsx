import { Flex, Stack } from '@chakra-ui/react';

const AuthLayout = ({ children }) => {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'gray.200'}
        >
            <Stack
                spacing={10}
                mx={'auto'}
                maxW={'md'}
                w={'full'}
                py={12}
                px={6}
            >
                {children}
            </Stack>
        </Flex>
    );
};

export default AuthLayout;
