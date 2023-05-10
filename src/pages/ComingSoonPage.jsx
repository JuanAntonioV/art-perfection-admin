import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ComingSoonPage() {
    return (
        <Center h={'80vh'}>
            <Stack spacing={4} direction='column' align='center'>
                <Heading as={'h1'} fontSize={'3xl'} fontWeight={'bold'}>
                    Coming Soon
                </Heading>
                <Text fontSize={'sm'}>This page is under construction</Text>

                <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                    <Box
                        as={'button'}
                        bg={'blue.500'}
                        color={'white'}
                        px={5}
                        py={2}
                        rounded={'md'}
                        _hover={{
                            bg: 'blue.600',
                        }}
                        fontSize={'sm'}
                    >
                        Back to Dashboard
                    </Box>
                </Link>
            </Stack>
        </Center>
    );
}
