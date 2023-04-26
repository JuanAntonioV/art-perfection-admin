import AlertDeleteDialog from '@/components/dialogs/AlertDeleteDialog';
import TableBasic from '@/components/tables/TableBasic';
import { dateParser } from '@/helpers/date-helper';
import {
    downGradeHead,
    getHeads,
    nonActiveHead,
} from '@/stores/thunks/headsThunk';
import {
    Badge,
    Box,
    Heading,
    IconButton,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { BsPersonDown } from 'react-icons/bs';
import { TbUserSearch } from 'react-icons/tb';
import { TiWarningOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeadPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        isOpen: downGradeIsOpen,
        onOpen: downGradeOpen,
        onClose: downGradeClose,
    } = useDisclosure();
    const {
        isOpen: nonActiveIsOpen,
        onOpen: nonActiveOpen,
        onClose: nonActiveClose,
    } = useDisclosure();
    const [headsId, setHeadsId] = useState(null);
    const heads = useSelector((state) => state.head.heads);
    const token = useSelector((state) => state.auth.token);

    const handleDowngrade = (id) => {
        const payload = {
            user_id: id,
            token: token,
        };

        dispatch(downGradeHead(payload)).then((res) => {
            res.payload.status && dispatch(getHeads(token));
        });
    };

    const handleUnactive = (id) => {
        const payload = {
            user_id: id,
            token: token,
        };

        dispatch(nonActiveHead(payload)).then((res) => {
            res.payload.status && dispatch(getHeads(token));
        });
    };

    useEffect(() => {
        dispatch(getHeads(token));
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
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
        // let count = 1;
        return heads.map((heads) => {
            return {
                id: heads.id,
                name: heads.full_name,
                email: heads.email,
                status: (
                    <Badge
                        px={3}
                        py={1}
                        bg={heads.status ? 'green.400' : 'red'}
                        textColor={'white'}
                        rounded={'md'}
                        fontSize={'x-small'}
                    >
                        {heads.status ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                ),
                registeredAt: dateParser(heads.registered_at),
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
                            onClick={() => navigate(`/pimpinan/${heads.id}`)}
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
                                setHeadsId(heads.id);
                                downGradeOpen();
                            }}
                        >
                            <BsPersonDown size={20} />
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
                                setHeadsId(heads.id);
                                nonActiveOpen();
                            }}
                        >
                            <TiWarningOutline size={20} />
                        </IconButton>
                    </Box>
                ),
            };
        });
    }, [heads]);

    return (
        <>
            <AlertDeleteDialog
                isOpen={downGradeIsOpen}
                onClose={downGradeClose}
                title={'Turunkan Akun'}
                detail={'Anda yakin untuk merubah role akun ini?'}
                btnText={'Ya, Turunkan!'}
                action={handleDowngrade}
                id={headsId}
            />

            <AlertDeleteDialog
                isOpen={nonActiveIsOpen}
                onClose={nonActiveClose}
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
                        Pimpinan
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
