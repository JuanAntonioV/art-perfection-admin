import AlertDeleteDialog from '@/components/dialogs/AlertDeleteDialog';
import {
    Badge,
    Box,
    Button,
    Heading,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import TableBasic from '@/components/tables/TableBasic';
import { TbUserSearch } from 'react-icons/tb';
import { TiWarningOutline } from 'react-icons/ti';

const EmployePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [employeId, setEmployeId] = useState(null);

    const handleUnactive = (id) => {
        console.log('ID Employes', id);
    };

    const employes = useSelector((state) => state.employes.employes);

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
                name: employe.name,
                email: employe.email,
                status: (
                    <Badge
                        px={3}
                        py={1}
                        bg={employe.status == 'active' ? 'cyan' : 'red'}
                        textColor={'white'}
                        rounded={'md'}
                        fontSize={'x-small'}
                    >
                        {employe.status ? 'active' : 'nonactive'}
                    </Badge>
                ),
                registeredAt: employe.registeredAt,
                action: (
                    <Box>
                        <Button
                            size='sm'
                            textColor={'blue.400'}
                            bg={'transparent'}
                            _hover={{
                                bg: 'blue.400',
                                textColor: 'white',
                            }}
                        >
                            <TbUserSearch size={20} />
                        </Button>
                        <Button
                            size='sm'
                            ml={2}
                            textColor={'red'}
                            bg={'transparent'}
                            _hover={{
                                bg: 'red',
                                textColor: 'white',
                            }}
                            onClick={() => {
                                setEmployeId(employe.id);
                                onOpen();
                            }}
                        >
                            <TiWarningOutline size={20} />
                        </Button>
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
                title={'Nonaktifkan Akun'}
                detail={'Anda yakin untuk menonaktifkan akun ini?'}
                btnText={'Nonaktifkan'}
                action={handleUnactive}
                id={employeId}
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
