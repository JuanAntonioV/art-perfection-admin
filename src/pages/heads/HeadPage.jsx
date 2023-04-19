import AlertDeleteDialog from '@/components/dialogs/AlertDeleteDialog';
import TableBasic from '@/components/tables/TableBasic';
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
import { TbUserSearch } from 'react-icons/tb';
import { TiWarningOutline } from 'react-icons/ti';
import { useSelector } from 'react-redux';

const HeadPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [headsId, setheadsId] = useState(null);
    const heads = useSelector((state) => state.head.heads);

    const handleUnactive = (id) => {
        console.log('ID Heads', id);
    };

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
        return heads.map((heads) => {
            return {
                count: count++,
                name: heads.name,
                email: heads.email,
                status: (
                    <Badge
                        px={3}
                        py={1}
                        bg={heads.status == 'active' ? 'green.400' : 'red'}
                        textColor={'white'}
                        rounded={'md'}
                        fontSize={'x-small'}
                    >
                        {heads.status == 'active' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                ),
                registeredAt: heads.registeredAt,
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
                                setheadsId(heads.id);
                                onOpen();
                            }}
                        >
                            <TiWarningOutline size={20} />
                        </Button>
                    </Box>
                ),
            };
        });
    }, [heads]);

    return (
        <>
            <AlertDeleteDialog
                isOpen={isOpen}
                onClose={onClose}
                title={'Nonaktifkan Akun'}
                detail={'Anda yakin untuk menonaktifkan akun ini?'}
                btnText={'Nonaktifkan'}
                action={handleUnactive}
                id={headsId}
            />

            <Box bg={'white'} p={6} rounded={'lg'}>
                <Stack
                    spacing={1}
                    borderBottom={'1px'}
                    borderColor={'gray.200'}
                    pb={4}
                >
                    <Heading as='h3' size='md'>
                        Heads
                    </Heading>

                    <Text fontSize={'sm'} color={'gray.500'}>
                        Menu untuk mengelola data pimpinan yang telah di
                        daftarkan pada sistem.
                    </Text>
                </Stack>

                <TableBasic columns={columns} data={data} />
            </Box>
        </>
    );
};

export default HeadPage;
