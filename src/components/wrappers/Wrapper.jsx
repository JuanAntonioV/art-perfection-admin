import { Box, Heading, Stack, Text } from '@chakra-ui/react';

const Wrapper = ({ children, title, description }) => {
    return (
        <Box bg={'white'} p={6} rounded={'lg'} h={'fit-content'}>
            <Stack
                spacing={1}
                borderBottom={'1px'}
                borderColor={'gray.200'}
                pb={4}
                mb={4}
            >
                <Heading as='h3' size='md'>
                    {title ?? 'Dashboard'}
                </Heading>

                <Text fontSize={'sm'} color={'gray.500'}>
                    {description ?? 'Dashboard Description'}
                </Text>
            </Stack>

            {children}
        </Box>
    );
};

export default Wrapper;
