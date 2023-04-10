import AuthLayout from '@/layouts/AuthLayout';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link as ChakraLink,
    Button,
    Heading,
    Text,
    Alert,
    AlertTitle,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [value, setValue] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            value.email !== 'admin@email.com' ||
            value.password !== 'admin123'
        ) {
            setErrors('Email atau password salah.');
        } else {
            console.log('Login success');
            setErrors('');
        }
    };

    return (
        <AuthLayout>
            <Box rounded={'2xl'} bg={'white'} boxShadow={'lg'} p={8}>
                <Stack spacing={6}>
                    <Stack spacing={4}>
                        <Stack align={'start'} spacing={1}>
                            <Heading fontSize={'xl'} fontWeight={'bold'}>
                                Masuk
                            </Heading>

                            <Text fontSize={'sm'} color={'gray.600'}>
                                Masuk untuk melanjutkan ke dashboard
                            </Text>
                        </Stack>

                        {errors ? (
                            <Alert status='error' rounded={'lg'}>
                                <AlertTitle
                                    fontSize={'sm'}
                                    textColor={'red.600'}
                                    fontWeight={'normal'}
                                >
                                    {errors}
                                </AlertTitle>
                            </Alert>
                        ) : null}
                    </Stack>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl id='email' isRequired>
                                <FormLabel fontSize={'sm'}>
                                    Email address
                                </FormLabel>
                                <Input
                                    name='email'
                                    type='email'
                                    placeholder='e.g. name@email.com'
                                    value={value.email}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl id='password' isRequired>
                                <FormLabel fontSize={'sm'}>Password</FormLabel>
                                <Input
                                    name='password'
                                    type='password'
                                    placeholder={'••••••••'}
                                    value={value.password}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <Stack spacing={8}>
                                <Stack
                                    direction={{
                                        base: 'column',
                                        sm: 'row',
                                    }}
                                    align={'start'}
                                    justify={'space-between'}
                                >
                                    <Checkbox
                                        name='rememberMe'
                                        value={value.rememberMe}
                                        onChange={handleChange}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <ChakraLink
                                        color={'blue.400'}
                                        fontSize={'sm'}
                                        to='/forgot-password'
                                        as={Link}
                                    >
                                        Forgot password?
                                    </ChakraLink>
                                </Stack>

                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    fontSize={'sm'}
                                    type={'submit'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Stack>
            </Box>

            <Stack align={'center'}>
                <Text fontSize={'sm'} color={'gray.400'}>
                    &copy; 2023 Art Perfection Group. All rights reserved.
                </Text>
            </Stack>
        </AuthLayout>
    );
};

export default LoginPage;
