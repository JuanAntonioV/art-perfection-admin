import AlertResponseError from '@/components/alerts/AlertResponseError';
import Wrapper from '@/components/wrappers/Wrapper';
import {
    getEmployeeDetail,
    updateEmployee,
} from '@/stores/thunks/employeeThunk';
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

const DetailEmployee = () => {
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.employes.employee);
    const { user, token } = useSelector((state) => state.auth);
    const error = useSelector((state) => state.employes.error);
    const status = useSelector((state) => state.employes.status);
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
            role_id: value.role === employee.role ? null : value.role,
        };

        dispatch(updateEmployee(payload)).then((res) => {
            if (res.payload.status) {
                handleFetchEmployee();
                navigate('/anggota');
            }
        });
    };

    const handleFetchEmployee = () => {
        const payload = {
            id: id,
            token: token,
        };

        dispatch(getEmployeeDetail(payload));
    };

    useEffect(() => {
        handleFetchEmployee();
    }, [dispatch, id]);

    useEffect(() => {
        setValue({
            name: employee?.full_name,
            email: employee?.email,
            role: employee?.role,
            status: employee?.status,
            registered_at: employee?.registered_at
                ? new Date(employee?.registered_at).toISOString().slice(0, 10)
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
    }, [employee]);

    return (
        <Wrapper
            title={'Detail Anggota'}
            description={'Menu ini digunakan untuk melihat detail anggota'}
        >
            <AlertResponseError status={status} error={error} my={4} />

            <form onSubmit={handleSubmit}>
                <Stack spacing={6}>
                    <Box>
                        <FormLabel>Nama</FormLabel>
                        <Input
                            type='text'
                            maxLength={45}
                            isDisabled={!value.role || user.role !== 'admin'}
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
                            isDisabled={!value.role || user.role !== 'admin'}
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
                            isDisabled={!value.role || user.role !== 'admin'}
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
                                label='Status aktif menunjukkan bahwa anggota dapat melakukan login'
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
                        {user.role !== 'admin' ? null : (
                            <Button
                                type='submit'
                                colorScheme='blue'
                                w={'full'}
                                size={'md'}
                                mt={6}
                                isDisabled={
                                    !value.role ||
                                    (value.name === employee?.full_name &&
                                        value.email === employee?.email &&
                                        value.role === employee?.role)
                                }
                            >
                                Simpan
                            </Button>
                        )}
                    </Box>
                </Stack>
            </form>
        </Wrapper>
    );
};

export default DetailEmployee;
