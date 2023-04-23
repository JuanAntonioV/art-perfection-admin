import AuthLayout from '@/layouts/AuthLayout';
import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ResetPasswordForm from './partials/ResetPasswordForm';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '@/stores/thunks/authThunk';
import AlertResponseError from '@/components/alerts/AlertResponseError';
import { useEffect } from 'react';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const status = useSelector((state) => state.auth.status);
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = (values, setSubmitting) => {
        const payload = {
            email: searchParams.get('email'),
            password: values.password,
            password_confirmation: values.passwordConfirmation,
            token: searchParams.get('token'),
        };

        setTimeout(() => {
            dispatch(resetPassword(payload)).then((res) => {
                if (res.payload.data.code === 200) navigate('/login');
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
                                Ubah password
                            </Heading>

                            <Text fontSize={'sm'} color={'gray.600'}>
                                Masukkan password baru anda.
                            </Text>
                        </Stack>
                    </Stack>

                    <AlertResponseError status={status} error={error} />

                    <ResetPasswordForm onSubmit={handleSubmit} />
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

export default ResetPasswordPage;
