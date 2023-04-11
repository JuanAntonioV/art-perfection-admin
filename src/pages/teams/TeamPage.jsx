import { Box, Heading, Stack, Text } from '@chakra-ui/react';

const TeamPage = () => {
    return (
        <Box bg={'white'} p={6} rounded={'lg'}>
            <Stack
                spacing={1}
                borderBottom={'1px'}
                borderColor={'gray.200'}
                pb={4}
            >
                <Heading as='h3' size='md'>
                    Teams
                </Heading>

                <Text fontSize={'sm'} color={'gray.500'}>
                    Menu untuk mengelola tim yang di buat sesuai dengan
                    kebutuhan perusahaan.
                </Text>
            </Stack>
        </Box>
    );
};

export default TeamPage;
