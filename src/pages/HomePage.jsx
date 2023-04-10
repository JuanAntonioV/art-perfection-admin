import { useSelector } from 'react-redux';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';

const HomePage = () => {
    const auth = useSelector((state) => state.auth);

    return (
        <div>
            <Heading as={'h2'} size='lg' fontWeight={'bold'}>
                I'm a Heading
            </Heading>
            <Text>{auth.user.name}</Text>

            <Stack spacing={4} direction='row' align='center'>
                <Button colorScheme='teal' size='xs'>
                    Button
                </Button>
                <Button colorScheme='teal' size='sm'>
                    Button
                </Button>
                <Button colorScheme='teal' size='md'>
                    Button
                </Button>
                <Button colorScheme='teal' size='lg'>
                    Button
                </Button>
            </Stack>
        </div>
    );
};

export default HomePage;
