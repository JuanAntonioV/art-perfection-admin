import AlertResponseError from '@/components/alerts/AlertResponseError';
import AlertResponseInfo from '@/components/alerts/AlertResponseInfo';
import CountdownTimer from '@/components/timers/CountdownTimer';
import AuthLayout from '@/layouts/AuthLayout';
import { forgotPassword } from '@/stores/thunks/authThunk';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    Link as ChakraLink,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [successSend, setSuccessSend] = useState('');

    const { status, error } = useSelector((state) => state.auth);
    const expiredAt = useSelector((state) => state.auth.forgotPassword.expires);

    const handleChange = (e) => {
        if (e.target.value.match(/^[A-Za-z0-9@. ]*$/)) {
            setEmail(e.target.value);
        } else if (e.target.value === '') {
            setEmail(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendEmail(email);
    };

    const sendEmail = (value) => {
        const payload = {
            email: value,
        };

        dispatch(forgotPassword(payload)).then((res) => {
            if (res.payload.code === 200) {
                setIsSending(true);
                setSuccessSend('success');
            }
        });
    };

    useEffect(() => {
        console.log(successSend);
    }, [successSend]);

    return (
        <AuthLayout>
            <Box rounded={'2xl'} bg={'white'} boxShadow={'lg'} p={8}>
                <Stack spacing={6}>
                    <Stack align={'start'} spacing={1}>
                        <Heading fontSize={'xl'} fontWeight={'bold'}>
                            Lupa Password
                        </Heading>

                        <Text fontSize={'sm'} color={'gray.600'}>
                            Masukkan email untuk merubah password.
                        </Text>
                    </Stack>

                    <AlertResponseError status={status} error={error} />
                    <AlertResponseInfo
                        status={successSend}
                        info={'Link berhasil dikirim'}
                    />

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={8}>
                            <FormControl id='email' isRequired>
                                <FormLabel fontSize={'sm'}>
                                    Email address
                                </FormLabel>
                                <Input
                                    name='email'
                                    type='email'
                                    placeholder='e.g. name@email.com'
                                    value={email}
                                    onChange={handleChange}
                                />
                                {isSending ? (
                                    <Stack mt={2} mb={-2}>
                                        <CountdownTimer
                                            timer={expiredAt}
                                            resendAction={() =>
                                                sendEmail(email)
                                            }
                                        />
                                    </Stack>
                                ) : (
                                    <FormHelperText
                                        fontSize={'xs'}
                                        textColor={'gray.400'}
                                    >
                                        Kami akan mengirimkan link untuk merubah
                                        password.
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Button
                                    w={'full'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    fontSize={'sm'}
                                    type={'submit'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    isDisabled={isSending}
                                >
                                    Kirim
                                </Button>
                            </Stack>
                        </Stack>
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

            <Stack align={'center'}>
                <Text fontSize={'sm'} color={'gray.400'}>
                    &copy; 2023 Art Perfection Group. All rights reserved.
                </Text>
            </Stack>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
