import AuthLayout from '@/layouts/AuthLayout';
import {
    Alert,
    AlertTitle,
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link as ChakraLink,
    Stack,
    Text,
    Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [value, setValue] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // check if fullName is contain number or symbol
        if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(value.fullName)) {
            setErrors('Nama lengkap tidak boleh mengandung angka atau simbol.');
        } else if (value.password.length < 6) {
            setErrors('Password minimal 6 karakter.');
        } else {
            console.log('Register success');
            setErrors('');
            navigate('/login');
        }
    };

    return (
        <AuthLayout>
            <Box rounded={'2xl'} bg={'white'} boxShadow={'lg'} p={8}>
                <Stack spacing={6}>
                    <Stack spacing={4}>
                        <Stack align={'start'} spacing={1}>
                            <Heading fontSize={'xl'} fontWeight={'bold'}>
                                Register
                            </Heading>

                            <Text fontSize={'sm'} color={'gray.600'}>
                                Daftar untuk melanjutkan ke dashboard
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
                            <FormControl id='fullName' isRequired>
                                <FormLabel fontSize={'sm'}>
                                    Nama lengkap
                                </FormLabel>
                                <Input
                                    name='fullName'
                                    type='text'
                                    placeholder='e.g. Reza Pratama'
                                    value={value.fullName}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl id='email' isRequired>
                                <FormLabel fontSize={'sm'}>
                                    Alamat email
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
                        </Stack>

                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            fontSize={'sm'}
                            type={'submit'}
                            w={'full'}
                            mt={6}
                            _hover={{
                                bg: 'blue.500',
                            }}
                        >
                            Daftar
                        </Button>
                    </form>
                </Stack>

                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                    mt={6}
                >
                    <Text fontSize={'sm'} color={'gray.600'}>
                        Sudah punya akun?{' '}
                        <ChakraLink
                            as={Link}
                            to={'/login'}
                            color={'blue.400'}
                            fontWeight={'bold'}
                        >
                            Masuk
                        </ChakraLink>
                    </Text>
                </Stack>
            </Box>
        </AuthLayout>
    );
};

export default RegisterPage;
