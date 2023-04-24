import AlertDeleteDialog from '@/components/dialogs/AlertDeleteDialog';
import TableBasic from '@/components/tables/TableBasic';
import { getTeams } from '@/stores/thunks/teamsThunk';
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
import { MdManageSearch } from 'react-icons/md';
import { TiTrash, TiWarningOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TeamPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [teamId, setTeamId] = useState(null);

    const handleDelete = (id) => {
        console.log('ID teams', id);
    };

    const handleViewDetail = (id) => {
        console.log('ID teams', id);
        navigate(`/teams/${id}`);
    };

    const handleAdd = () => {
        navigate('/teams/create');
    };

    const teams = useSelector((state) => state.team.teams);
    const status = useSelector((state) => state.team.status);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        console.log('teams', teams);
    }, [teams]);

    useEffect(() => {
        status === 'idle' && dispatch(getTeams(token));
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
                Header: 'Head',
                accessor: 'head',
            },
            {
                Header: 'Total Anggota',
                accessor: 'employeeTotal',
            },
            {
                Header: 'Created At',
                accessor: 'createdAt',
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
        return teams.map((team) => {
            return {
                count: count++,
                name: team.name,
                head: team.head,
                employeeTotal: team.employeeTotal + ' Orang',
                createdAt: team.createdAt,
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
                            onClick={() => handleViewDetail(team.id)}
                        >
                            <MdManageSearch size={20} />
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
                                setTeamId(team.id);
                                onOpen();
                            }}
                        >
                            <TiTrash size={20} />
                        </IconButton>
                    </Box>
                ),
            };
        });
    }, [teams]);

    return (
        <>
            <AlertDeleteDialog
                isOpen={isOpen}
                onClose={onClose}
                title={'Hapus Tim'}
                detail={'Anda yakin untuk menghapus tim ini?'}
                btnText={'Hapus'}
                action={handleDelete}
                id={teamId}
            />

            <Box bg={'white'} p={6} rounded={'lg'}>
                <Stack
                    spacing={1}
                    borderBottom={'1px'}
                    borderColor={'gray.200'}
                    pb={4}
                >
                    <Heading as='h3' size='md'>
                        Teams
                    </Heading>

                    <Text fontSize={'sm'} color={'gray.500'}>
                        Menu untuk mengelola tim yang di buat sesuai dengan
                        kebutuhan perusahaan.
                    </Text>
                </Stack>

                <TableBasic
                    columns={columns}
                    data={data}
                    addAction={handleAdd}
                />
            </Box>
        </>
    );
};

export default TeamPage;
