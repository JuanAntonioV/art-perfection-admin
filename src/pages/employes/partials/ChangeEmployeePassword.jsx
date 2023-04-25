import AlertResponseError from '@/components/alerts/AlertResponseError';
import Wrapper from '@/components/wrappers/Wrapper';
import { updatePassword } from '@/stores/thunks/authThunk';
import {
    Box,
    Button,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ChangeEmployeePassword = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const error = useSelector((state) => state.auth.error);
    const status = useSelector((state) => state.auth.status);

    const [value, setValue] = useState({
        password: '',
        password_confirmation: '',
    });

    const [show, setShow] = useState(false);

    const { id } = useParams();

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
            user_id: id,
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
                e.target.reset();
        });
    };

    return (
        <Wrapper
            title={'Ganti Password'}
            description={'Menu ini digunakan untuk mengubah password anggota'}
        >
            <Box mt={4}>
                <AlertResponseError error={error} status={status} my={4} />

                <form
                    id='updateEmployeePasswordForm'
                    onSubmit={handleSubmit}
                    method='post'
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
                    form='updateEmployeePasswordForm'
                    isDisabled={
                        value.password === '' ||
                        value.password_confirmation === '' ||
                        value.password.length <= 6 ||
                        value.password_confirmation.length <= 6
                    }
                >
                    Simpan
                </Button>
            </Box>
        </Wrapper>
    );
};

export default ChangeEmployeePassword;
