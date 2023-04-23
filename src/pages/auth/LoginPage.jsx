import AuthLayout from '@/layouts/AuthLayout';
import {
    Box,
    Stack,
    Link as ChakraLink,
    Heading,
    Text,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './partials/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/stores/thunks/authThunk';
import AlertResponseError from '@/components/alerts/AlertResponseError';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.auth.status);
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = (values, setSubmitting) => {
        setTimeout(() => {
            dispatch(login(values)).then((res) => {
                if (res.payload.data?.data?.token) navigate('/dashboard');
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
                                Masuk
                            </Heading>

                            <Text fontSize={'sm'} color={'gray.600'}>
                                Masuk untuk melanjutkan ke dashboard
                            </Text>
                        </Stack>
                    </Stack>

                    <AlertResponseError status={status} error={error} />

                    <LoginForm onSubmit={handleSubmit} />
                </Stack>

                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                    mt={6}
                >
                    <Text fontSize={'sm'} color={'gray.600'}>
                        Belum punya akun?{' '}
                        <ChakraLink
                            as={Link}
                            to={'/register'}
                            color={'blue.400'}
                            fontWeight={'bold'}
                        >
                            Daftar
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

export default LoginPage;
