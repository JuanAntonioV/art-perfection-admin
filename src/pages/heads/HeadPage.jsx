import { Box, Heading, Stack, Text } from '@chakra-ui/react';

const HeadPage = () => {
    return (
        <Box bg={'white'} p={6} rounded={'lg'}>
            <Stack
                spacing={1}
                borderBottom={'1px'}
                borderColor={'gray.200'}
                pb={4}
            >
                <Heading as='h3' size='md'>
                    Heads
                </Heading>

                <Text fontSize={'sm'} color={'gray.500'}>
                    Menu untuk mengelola data pimpinan yang telah di daftarkan
                    pada sistem.
                </Text>
            </Stack>
        </Box>
    );
};

export default HeadPage;
