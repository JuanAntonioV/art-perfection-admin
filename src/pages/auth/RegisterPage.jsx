import AuthLayout from '@/layouts/AuthLayout';
import {
    Box,
    Heading,
    Link as ChakraLink,
    Stack,
    Text,
    Alert,
    AlertTitle,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from './partials/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/stores/thunks/authThunk';
import { upperFirst } from '@/helpers/TextHelper';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const status = useSelector((state) => state.auth.status);

    const handleSubmit = (values, setSubmitting) => {
        const payload = {
            full_name: values.fullName,
            email: values.email,
            password: values.password,
        };

        setTimeout(() => {
            dispatch(register(payload)).then((res) => {
                if (res.payload.data?.code === 200) navigate('/login');
            });

            setSubmitting(false);
        }, 1000);
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
                    </Stack>

                    <Alert
                        status={'error'}
                        display={status === 'failed' ? 'block' : 'none'}
                        rounded={'md'}
                        fontSize={'sm'}
                        textColor={'red.500'}
                    >
                        <AlertTitle>{upperFirst(error?.message)}</AlertTitle>
                    </Alert>

                    <RegisterForm onSubmit={handleSubmit} />
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

            <Stack align={'center'}>
                <Text fontSize={'sm'} color={'gray.400'}>
                    &copy; 2023 Art Perfection Group. All rights reserved.
                </Text>
            </Stack>
        </AuthLayout>
    );
};

export default RegisterPage;
