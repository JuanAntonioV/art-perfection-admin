import AuthLayout from '@/layouts/AuthLayout';
import { Box, Stack, Heading, Text, Alert, AlertTitle } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from './partials/ResetPasswordForm';

const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (values, actions) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log('Ubah password berhasil');
            navigate('/login');
            actions.setSubmitting(false);
        }, 1000);
    };

    return (
        <AuthLayout>
            <Box rounded={'2xl'} bg={'white'} boxShadow={'lg'} p={8}>
                <Stack spacing={6}>
                    <Stack spacing={4}>
                        <Stack align={'start'} spacing={1}>
                            <Heading fontSize={'xl'} fontWeight={'bold'}>
                                Ubah password
                            </Heading>

                            <Text fontSize={'sm'} color={'gray.600'}>
                                Masukkan password baru anda.
                            </Text>
                        </Stack>
                    </Stack>

                    <ResetPasswordForm submitAction={handleSubmit} />
                </Stack>
            </Box>
        </AuthLayout>
    );
};

export default ResetPasswordPage;
