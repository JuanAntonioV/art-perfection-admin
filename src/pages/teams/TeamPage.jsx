import AlertDeleteDialog from '@/components/dialogs/AlertDeleteDialog';
import TableBasic from '@/components/tables/TableBasic';
import { dateParser } from '@/helpers/date-helper';
import {
    deleteTeam,
    getTeamDetails,
    getTeams,
} from '@/stores/thunks/teamsThunk';
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
        const payload = {
            token: token,
            teamId: id,
        };

        dispatch(deleteTeam(payload)).then((res) => {
            res.payload.status ? dispatch(getTeams(token)) : null;
        });
    };

    const handleViewDetail = (id) => {
        const payload = {
            token: token,
            teamId: id,
        };

        dispatch(getTeamDetails(payload)).then(() => {
            navigate(`/teams/${id}`);
        });
    };

    const handleAdd = () => {
        navigate('/teams/create');
    };

    const teams = useSelector((state) => state.team.teams);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        dispatch(getTeams(token));
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
                head: team.head_name,
                employeeTotal: team.total_user + ' Orang',
                createdAt: dateParser(team.created_at),
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
                        Tim
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
