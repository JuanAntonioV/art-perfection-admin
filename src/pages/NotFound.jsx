import { Flex, Heading, Text, VStack } from '@chakra-ui/react';

const NotFound = () => {
    return (
        <Flex align='center' justify='center' h='100vh' bg={'gray.100'}>
            <VStack spacing={4}>
                <Heading as='h1' size='4xl'>
                    404
                </Heading>
                <Text size='sm' textColor={'gray.500'}>
                    Sorry, we couldn't find that page.
                </Text>
            </VStack>
        </Flex>
    );
};

export default NotFound;
