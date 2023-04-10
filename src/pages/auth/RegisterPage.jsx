import AuthLayout from '@/layouts/AuthLayout';
import {
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
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from './partials/RegisterForm';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (values, setSubmitting) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            navigate('/login');
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
        </AuthLayout>
    );
};

export default RegisterPage;
