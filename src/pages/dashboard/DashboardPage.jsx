import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import StatSection from './partials/StatSection';

const DashboardPage = () => {
    return (
        <>
            <Stack spacing={10}>
                <StatSection />

                <Box bg={'white'} p={6} rounded={'lg'}>
                    <Stack
                        spacing={1}
                        borderBottom={'1px'}
                        borderColor={'gray.200'}
                        pb={4}
                    >
                        <Heading as='h3' size='md'>
                            Dashboard
                        </Heading>

                        <Text fontSize={'sm'} color={'gray.500'}>
                            Menu ini berisi informasi mengenai data yang ada
                            pada votes system.
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </>
    );
};

export default DashboardPage;
