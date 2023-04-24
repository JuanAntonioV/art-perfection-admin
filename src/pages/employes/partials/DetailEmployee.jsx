import Wrapper from '@/components/wrappers/Wrapper';
import { getEmployeeDetail } from '@/stores/thunks/employeeThunk';
import {
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const DetailEmployee = () => {
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.employes.employee);
    const token = useSelector((state) => state.auth.token);

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
            name: value.name,
            email: value.email,
            role: value.role,
            status: value.status,
        };
    };

    useEffect(() => {
        const payload = {
            id: id,
            token: token,
        };

        dispatch(getEmployeeDetail(payload));
    }, [dispatch, id]);

    useEffect(() => {
        setValue({
            name: employee?.full_name,
            email: employee?.email,
            role: employee?.role ? employee?.role[0] : '',
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
            title={'Detail Employe'}
            description={'Menu ini digunakan untuk melihat detail employe'}
        >
            <form onSubmit={handleSubmit}>
                <Stack spacing={6}>
                    <FormControl>
                        <FormLabel>Nama</FormLabel>
                        <Input
                            type='text'
                            maxLength={45}
                            name='name'
                            value={value.name}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type='email'
                            maxLength={45}
                            required
                            name='email'
                            value={value.email}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tanggal Registrasi</FormLabel>
                        <Input
                            type='date'
                            maxLength={45}
                            disabled
                            name='registered_at'
                            value={value.registered_at}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={'sm'}>Role</FormLabel>
                        <Select
                            placeholder='Pilih role'
                            name={'role'}
                            onChange={handleChange}
                        >
                            <option value='2' selected={value?.role === 'head'}>
                                Head
                            </option>
                            <option
                                value='3'
                                selected={value?.role === 'employee'}
                            >
                                Employe
                            </option>
                        </Select>
                    </FormControl>

                    <FormControl>
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
                                label='Status aktif menunjukkan bahwa employe dapat melakukan login'
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
                    </FormControl>

                    <Box>
                        <Button
                            type='submit'
                            colorScheme='blue'
                            w={'full'}
                            size={'md'}
                            mt={6}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Wrapper>
    );
};

export default DetailEmployee;
