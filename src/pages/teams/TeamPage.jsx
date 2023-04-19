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

const TeamPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [teamId, setteamId] = useState(null);

    const handleUnactive = (id) => {
        console.log('ID teams', id);
    };

    const teams = useSelector((state) => state.team.teams);

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
                Header: 'Status',
                accessor: 'status',
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
                status: (
                    <Badge
                        px={3}
                        py={1}
                        bg={team.status == 'active' ? 'green.400' : 'red'}
                        textColor={'white'}
                        rounded={'md'}
                        fontSize={'x-small'}
                    >
                        {team.status == 'active' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                ),
                createdAt: team.createdAt,
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
                                setteamId(team.id);
                                onOpen();
                            }}
                        >
                            <TiWarningOutline size={20} />
                        </Button>
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
                title={'Nonaktifkan Akun'}
                detail={'Anda yakin untuk menonaktifkan akun ini?'}
                btnText={'Nonaktifkan'}
                action={handleUnactive}
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

                <TableBasic columns={columns} data={data} />
            </Box>
        </>
    );
};

export default TeamPage;
