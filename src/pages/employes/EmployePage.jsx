import AlertDeleteDialog from '@/components/dialogs/AlertDeleteDialog';
import {
    Box,
    Heading,
    Stack,
    Text,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Button,
    useDisclosure,
    Badge,
} from '@chakra-ui/react';
import { TbUserSearch, TiWarningOutline } from 'react-icons/all';
import { employes } from './data';
import { useState } from 'react';

const EmployePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [employeId, setEmployeId] = useState(null);

    const handleUnactive = (id) => {
        console.log('ID Employes', id);
    };

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

                <TableContainer mt={4}>
                    <Table variant='striped' colorScheme='gray' size={'sm'}>
                        <Thead>
                            <Tr>
                                <Th w={10}>#</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Status</Th>
                                <Th>Registered At</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {employes.map((employe, index) => (
                                <Tr key={employe.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{employe.name}</Td>
                                    <Td>{employe.email}</Td>
                                    <Td>
                                        {employe.status === 'active' ? (
                                            <Badge
                                                variant='solid'
                                                colorScheme='green'
                                            >
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge
                                                variant='solid'
                                                colorScheme='red'
                                            >
                                                Nonactive
                                            </Badge>
                                        )}
                                    </Td>
                                    <Td>{employe.registeredAt}</Td>
                                    <Td isNumeric>
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
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default EmployePage;
