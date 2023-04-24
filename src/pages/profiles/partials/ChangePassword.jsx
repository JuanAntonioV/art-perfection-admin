import AlertResponseError from '@/components/alerts/AlertResponseError';
import AlertResponseInfo from '@/components/alerts/AlertResponseInfo';
import { getUser, updatePassword } from '@/stores/thunks/authThunk';
import {
    Box,
    Button,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const error = useSelector((state) => state.auth.error);
    const status = useSelector((state) => state.auth.status);

    const [value, setValue] = useState({
        password: '',
        password_confirmation: '',
    });

    const [show, setShow] = useState(false);

    const handlePasswordShow = () => setShow(!show);

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            password: value.password,
            password_confirmation: value.password_confirmation,
            token: token,
        };

        dispatch(updatePassword(payload)).then((res) => {
            res.payload.code === 200 &&
                setValue({
                    password: '',
                    password_confirmation: '',
                }) &&
                setShow(false) &&
                e.target.reset() &&
                dispatch(getUser(token));
        });
    };

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <Box bg={'white'} p={6} rounded={'lg'}>
            <Stack
                spacing={1}
                borderBottom={'1px'}
                borderColor={'gray.200'}
                pb={4}
            >
                <Heading as='h3' size='md'>
                    Change Password
                </Heading>

                <Text fontSize={'sm'} color={'gray.500'}>
                    Menu untuk merubah password akun.
                </Text>
            </Stack>

            <Box mt={4}>
                <AlertResponseError error={error} status={status} my={4} />

                <form
                    method='post'
                    id='updatePasswordForm'
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={4}>
                        <Stack>
                            <FormLabel fontSize={'sm'} mb={1}>
                                Password baru
                            </FormLabel>
                            <InputGroup size={'md'}>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder='••••••••'
                                    name='password'
                                    value={value.password}
                                    onChange={handleChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button
                                        h='1.75rem'
                                        size='sm'
                                        onClick={handlePasswordShow}
                                        bg={'transparent'}
                                        _hover={{
                                            bg: 'transparent',
                                        }}
                                    >
                                        {show ? (
                                            <BsEyeSlash size={20} />
                                        ) : (
                                            <BsEye size={20} />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Stack>

                        <Stack>
                            <FormLabel fontSize={'sm'} mb={1}>
                                Konfimasi password
                            </FormLabel>
                            <InputGroup size={'md'}>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder='••••••••'
                                    name='password_confirmation'
                                    value={value.password_confirmation}
                                    onChange={handleChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button
                                        h='1.75rem'
                                        size='sm'
                                        onClick={handlePasswordShow}
                                        bg={'transparent'}
                                        _hover={{
                                            bg: 'transparent',
                                        }}
                                    >
                                        {show ? (
                                            <BsEyeSlash size={20} />
                                        ) : (
                                            <BsEye size={20} />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Stack>
                    </Stack>
                </form>
            </Box>

            <Box mt={8} textAlign={'right'}>
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    fontSize={'sm'}
                    type={'submit'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    isDisabled={
                        value.password === '' ||
                        value.password_confirmation === '' ||
                        value.password.length <= 6 ||
                        value.password_confirmation.length <= 6
                    }
                    form='updatePasswordForm'
                >
                    Simpan
                </Button>
            </Box>
        </Box>
    );
};

export default ChangePassword;
