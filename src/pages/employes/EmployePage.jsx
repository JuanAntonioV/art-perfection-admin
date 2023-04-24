import AlertDeleteDialog from '@/components/dialogs/AlertDeleteDialog';
import {
    Badge,
    Box,
    Button,
    Heading,
    IconButton,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableBasic from '@/components/tables/TableBasic';
import { TbUserSearch } from 'react-icons/tb';
import { TiWarningOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { getEmployee, nonActiveEmployee } from '@/stores/thunks/employeeThunk';
import { dateParser } from '@/helpers/dateHelper';

const EmployePage = () => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedEmployee, serSelectedEmployee] = useState(null);
    const employes = useSelector((state) => state.employes.employes);
    const status = useSelector((state) => state.employes.status);
    const token = useSelector((state) => state.auth.token);

    const navigate = useNavigate();

    const handleViewDetail = (id) => {
        console.log('ID Employes', id);

        navigate(`/employes/${id}`);
    };

    const handleUnactive = (id) => {
        const payload = {
            user_id: id,
            token: token,
        };

        dispatch(nonActiveEmployee(payload)).then((res) => {
            res.payload.code === 200 && dispatch(getEmployee(token));
        });
    };

    useEffect(() => {
        status === 'idle' && dispatch(getEmployee(token));
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Registered At',
                accessor: 'registeredAt',
            },
            {
                Header: 'Action',
                accessor: 'action',
            },
        ],
        []
    );

    const data = useMemo(() => {
        let count = 1;
        return employes.map((employe) => {
            return {
                count: count++,
                name: employe.full_name,
                email: employe.email,
                status: (
                    <Badge
                        px={3}
                        py={1}
                        bg={employe.status ? 'green.400' : 'red'}
                        textColor={'white'}
                        rounded={'md'}
                        fontSize={'x-small'}
                    >
                        {employe.status ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                ),
                registeredAt: dateParser(employe.registered_at),
                action: (
                    <Box>
                        <IconButton
                            size='sm'
                            textColor={'blue.400'}
                            bg={'transparent'}
                            _hover={{
                                bg: 'blue.400',
                                textColor: 'white',
                            }}
                            onClick={() => handleViewDetail(employe.id)}
                        >
                            <TbUserSearch size={20} />
                        </IconButton>
                        <IconButton
                            size='sm'
                            ml={2}
                            textColor={'red'}
                            bg={'transparent'}
                            _hover={{
                                bg: 'red',
                                textColor: 'white',
                            }}
                            onClick={() => {
                                serSelectedEmployee(employe);
                                onOpen();
                            }}
                        >
                            <TiWarningOutline size={20} />
                        </IconButton>
                    </Box>
                ),
            };
        });
    }, [employes]);

    return (
        <>
            <AlertDeleteDialog
                isOpen={isOpen}
                onClose={onClose}
                title={
                    selectedEmployee?.status
                        ? 'Nonaktifkan Akun'
                        : 'Aktifkan Akun'
                }
                detail={`Anda yakin untuk ${
                    selectedEmployee?.status ? 'menonaktifkan' : 'mengaktifkan'
                } akun ini?`}
                btnText={selectedEmployee?.status ? 'Nonaktifkan' : 'Aktifkan'}
                btnColor={selectedEmployee?.status ? 'red' : 'green'}
                action={handleUnactive}
                id={selectedEmployee?.id}
            />

            <Box bg={'white'} p={6} rounded={'lg'}>
                <Stack
                    spacing={1}
                    borderBottom={'1px'}
                    borderColor={'gray.200'}
                    pb={4}
                >
                    <Heading as='h3' size='md'>
                        Employes
                    </Heading>

                    <Text fontSize={'sm'} color={'gray.500'}>
                        Menu untuk mengelola karyawan yang terdaftar pada
                        sistem.
                    </Text>
                </Stack>

                <TableBasic columns={columns} data={data} />
            </Box>
        </>
    );
};

export default EmployePage;
