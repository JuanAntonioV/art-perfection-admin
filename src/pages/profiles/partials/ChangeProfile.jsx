import AlertResponseError from '@/components/alerts/AlertResponseError';
import AlertResponseInfo from '@/components/alerts/AlertResponseInfo';
import { getUser, updateProfile } from '@/stores/thunks/authThunk';
import {
    Badge,
    Box,
    Button,
    Flex,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const ChangeProfile = () => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const user = useSelector((state) => state.auth.user);
    const status = useSelector((state) => state.auth.status);
    const token = useSelector((state) => state.auth.token);
    const [value, setValue] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        setValue({
            name: user?.full_name,
            email: user?.email,
        });

        return () =>
            setValue({
                name: '',
                email: '',
            });
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: value.name,
            email: value.email,
            token: token,
        };

        dispatch(updateProfile(payload)).then((res) => {
            res.payload.code === 200 && dispatch(getUser(token));
        });
    };

    return (
        <Box bg={'white'} p={6} rounded={'lg'}>
            <Stack
                spacing={1}
                borderBottom={'1px'}
                borderColor={'gray.200'}
                pb={4}
            >
                <Heading as='h3' size='md'>
                    Profiles
                </Heading>

                <Text fontSize={'sm'} color={'gray.500'}>
                    Menu untuk mengelola data akun.
                </Text>
            </Stack>

            <Box mt={4}>
                <AlertResponseError error={error} status={'error'} my={4} />

                <form onSubmit={handleSubmit} method='post' id='profileForm'>
                    <Stack spacing={4}>
                        <Box>
                            <FormLabel fontSize={'sm'}>Nama</FormLabel>
                            <Input
                                type='text'
                                name='name'
                                placeholder='e.g. John Doe'
                                value={value.name || ''}
                                onChange={handleChange}
                                required
                                isDisabled={status === 'loading'}
                            />

                            <FormLabel fontSize={'sm'} mt={4}>
                                Email
                            </FormLabel>
                            <Input
                                type='email'
                                name='email'
                                placeholder='e.g. name@email.com'
                                value={value.email || ''}
                                onChange={handleChange}
                                required
                                isDisabled={status === 'loading'}
                            />

                            <FormLabel fontSize={'sm'} mt={4}>
                                Role
                            </FormLabel>
                            <Flex align='center' columnGap={1}>
                                {user?.role === 'admin' ? (
                                    <Badge
                                        variant='solid'
                                        colorScheme='green'
                                        py={1}
                                        px={4}
                                        rounded={'md'}
                                    >
                                        Admin
                                    </Badge>
                                ) : user?.role === 'employee' ? (
                                    <Badge
                                        variant='solid'
                                        colorScheme='blue'
                                        py={1}
                                        px={4}
                                        rounded={'md'}
                                    >
                                        Employee
                                    </Badge>
                                ) : user?.role === 'head' ? (
                                    <Badge
                                        variant='solid'
                                        colorScheme='red'
                                        py={1}
                                        px={4}
                                        rounded={'md'}
                                    >
                                        Head
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant='solid'
                                        colorScheme='yellow'
                                        py={1}
                                        px={4}
                                        rounded={'md'}
                                    >
                                        Tidak diketahui
                                    </Badge>
                                )}

                                <Tooltip
                                    label='Role hanya dapat diubah oleh admin.'
                                    placement='right'
                                    bg={'yellow.100'}
                                    color={'black'}
                                    fontSize={'sm'}
                                    hasArrow
                                    px={3}
                                    py={1.5}
                                    rounded={'sm'}
                                >
                                    <Button
                                        w={'fit-content'}
                                        h={'fit-content'}
                                        p={'0'}
                                        disabled
                                        bg={'transparent'}
                                        _hover={{
                                            bg: 'transparent',
                                        }}
                                    >
                                        <FaRegQuestionCircle
                                            size={18}
                                            color={'cyan'}
                                        />
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </Box>
                    </Stack>
                </form>
            </Box>

            <Box mt={8} textAlign={'right'}>
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    fontSize={'sm'}
                    type={'submit'}
                    form='profileForm'
                    _hover={{
                        bg: 'blue.500',
                    }}
                    isDisabled={
                        value.name === user?.full_name &&
                        value.email === user?.email
                    }
                >
                    Simpan
                </Button>
            </Box>
        </Box>
    );
};

export default ChangeProfile;
