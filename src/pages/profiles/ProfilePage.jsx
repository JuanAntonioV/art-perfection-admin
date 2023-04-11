import { Box, Heading, Stack, Text } from '@chakra-ui/react';

const ProfilePage = () => {
    return (
        <Box bg={'white'} p={6} rounded={'lg'}>
            <Stack
                spacing={1}
                borderBottom={'1px'}
                borderColor={'gray.200'}
                pb={4}
            >
                <Heading as='h3' size='md'>
                    Profiles
                </Heading>

                <Text fontSize={'sm'} color={'gray.500'}>
                    Menu untuk mengelola data user yang login pada sistem.
                </Text>
            </Stack>
        </Box>
    );
};

export default ProfilePage;
