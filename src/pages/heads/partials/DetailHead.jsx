import AlertResponseError from '@/components/alerts/AlertResponseError';
import Wrapper from '@/components/wrappers/Wrapper';
import {
    getEmployeeDetail,
    updateEmployee,
} from '@/stores/thunks/employeeThunk';
import { getHeadDetail, updateHead } from '@/stores/thunks/headsThunk';
import {
    Badge,
    Box,
    Button,
    Flex,
    FormLabel,
    Input,
    Select,
    Stack,
    Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const DetailHead = () => {
    const dispatch = useDispatch();
    const head = useSelector((state) => state.head.head);
    const token = useSelector((state) => state.auth.token);
    const error = useSelector((state) => state.head.error);
    const status = useSelector((state) => state.head.status);
    const navigate = useNavigate();

    const { id } = useParams();

    const [value, setValue] = useState({
        name: '',
        email: '',
        role: '',
        status: '',
        registered_at: '',
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            token: token,
            id: id,
            full_name: value.name,
            email: value.email,
            role_id: value.role === head.role ? null : value.role,
        };

        dispatch(updateHead(payload)).then((res) => {
            if (res.payload.status) {
                handleFetchHead();
                navigate('/pimpinan');
            }
        });
    };

    const handleFetchHead = () => {
        const payload = {
            id: id,
            token: token,
        };

        dispatch(getHeadDetail(payload));
    };

    useEffect(() => {
        handleFetchHead();
    }, [dispatch, id]);

    useEffect(() => {
        setValue({
            name: head?.full_name,
            email: head?.email,
            role: head?.role,
            status: head?.status,
            registered_at: head?.registered_at
                ? new Date(head?.registered_at).toISOString().slice(0, 10)
                : '',
        });

        return () =>
            setValue({
                name: '',
                email: '',
                role: '',
                status: '',
                registered_at: '',
            });
    }, [head]);

    return (
        <Wrapper
            title={'Detail Pimpinan'}
            description={'Menu ini digunakan untuk melihat detail pimpinan'}
        >
            <AlertResponseError status={status} error={error} my={4} />

            <form onSubmit={handleSubmit}>
                <Stack spacing={6}>
                    <Box>
                        <FormLabel>Nama</FormLabel>
                        <Input
                            type='text'
                            maxLength={45}
                            isDisabled={!value.name}
                            name='name'
                            value={value.name}
                            onChange={handleChange}
                            required
                        />
                    </Box>

                    <Box>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type='email'
                            maxLength={45}
                            required
                            isDisabled={!value.email}
                            name='email'
                            value={value.email}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box>
                        <FormLabel>Tanggal Registrasi</FormLabel>
                        <Input
                            type='date'
                            maxLength={45}
                            isDisabled
                            name='registered_at'
                            value={value.registered_at}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box>
                        <FormLabel fontSize={'sm'}>Role</FormLabel>
                        <Select
                            placeholder='Pilih role'
                            name={'role'}
                            isDisabled={!value.role}
                            value={
                                value.role === 'employee' || value.role === '3'
                                    ? '3'
                                    : value.role === 'head' ||
                                      value.role === '2'
                                    ? '2'
                                    : value.role === 'admin' ||
                                      value.role === '1'
                                    ? '1'
                                    : '0'
                            }
                            onChange={handleChange}
                            required
                        >
                            <option value='1'>Admin</option>
                            <option value='2'>Pimpinan</option>
                            <option value='3'>Anggota</option>
                        </Select>
                    </Box>

                    <Box>
                        <FormLabel fontSize={'sm'}>Status</FormLabel>
                        <Flex align='center' columnGap={1}>
                            {value.status ? (
                                <Badge
                                    variant='solid'
                                    colorScheme='green'
                                    py={1}
                                    px={4}
                                    rounded={'md'}
                                >
                                    Aktif
                                </Badge>
                            ) : (
                                <Badge
                                    variant='solid'
                                    colorScheme='red'
                                    py={1}
                                    px={4}
                                    rounded={'md'}
                                >
                                    Non Active
                                </Badge>
                            )}

                            <Tooltip
                                label='Status aktif menunjukkan bahwa pimpinan dapat melakukan login'
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

                    <Box>
                        <Button
                            type='submit'
                            colorScheme='blue'
                            w={'full'}
                            size={'md'}
                            mt={6}
                            isDisabled={
                                !value.email ||
                                (value.name === head?.full_name &&
                                    value.email === head?.email &&
                                    value.role === head?.role)
                            }
                        >
                            Simpan
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Wrapper>
    );
};

export default DetailHead;
