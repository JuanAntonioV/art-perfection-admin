import AlertResponseError from '@/components/alerts/AlertResponseError';
import DefaultLineChart from '@/components/charts/DefaultLineChart';
import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
import { dateParser } from '@/helpers/date-helper';
import PermissionMiddleware from '@/routes/middleware/PermissionMiddleware';
import { getEmployeeDetail } from '@/stores/thunks/employeeThunk';
import {
    assignUserToTeam,
    getTeamDetails,
    unAssignUserFromTeam,
    updateTeamDetail,
} from '@/stores/thunks/teamsThunk';
import {
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    Stack,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { TbUserSearch } from 'react-icons/tb';
import { TiTrash, TiWarningOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const TeamDetailPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: teamId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const [isEdit, setIsEdit] = useState(false);
    const { team, error, status } = useSelector((state) => state.team);
    const [value, setValue] = useState({
        name: '',
        head_id: '',
        description: '',
    });
    const [userId, setUserId] = useState('');

    useEffect(() => {
        fetchTeamDetails();
    }, [teamId]);

    const fetchTeamDetails = () => {
        const payload = {
            teamId: teamId,
            token: token,
        };

        dispatch(getTeamDetails(payload));
    };

    const handleAddUserToTeam = () => {
        const payload = {
            token: token,
            team_id: teamId,
            user_id: userId,
        };

        dispatch(assignUserToTeam(payload)).then((res) => {
            if (res.payload.status) {
                // window.location.reload();
                fetchTeamDetails();
            }
        });
    };

    useEffect(() => {
        if (team) {
            setValue({
                name: team.name,
                head_id: team.head_id,
                description: team.description,
            });
        }

        return () => {
            setValue({
                name: '',
                head_id: '',
                description: '',
            });
        };
    }, [team]);

    const handleOnChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleDelete = (id) => {
        const payload = {
            token: token,
            team_id: teamId,
            user_id: id,
        };

        dispatch(unAssignUserFromTeam(payload)).then((res) => {
            if (res.payload.status) {
                // window.location.rel  oad();
                fetchTeamDetails();
            }
        });
    };

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
                Header: 'Action',
                accessor: 'action',
            },
        ],
        []
    );

    const handleViewDetail = (id) => {
        const payload = {
            id: id,
            token: token,
        };

        dispatch(getEmployeeDetail(payload)).then((res) => {
            res.payload.code === 200 && navigate(`/employee/${id}`);
        });
    };

    const data = useMemo(() => {
        const userTeam = team ? team.users : [];

        return userTeam
            ? userTeam.map((user) => {
                  return {
                      id: user.id,
                      name: user.full_name,
                      email: user.email,
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
                                  onClick={() => handleViewDetail(user.id)}
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
                                  onClick={() => handleDelete(user.id)}
                                  disabled={!isEdit}
                              >
                                  <TiTrash size={20} />
                              </IconButton>
                          </Box>
                      ),
                  };
              })
            : [];
    }, [team]);

    const handleSave = () => {
        const payload = {
            token: token,
            teamId: teamId,
            name: value.name,
            head_id: value.head_id,
            description: value.description,
        };

        dispatch(updateTeamDetail(payload)).then((res) => {
            if (res.payload.status) {
                setIsEdit(false);
                fetchTeamDetails();
            }
        });
    };

    return (
        <Stack spacing={6}>
            <Wrapper
                title={'Detail Tim'}
                description={
                    'Menu ini digunakan untuk merubah atau memperbarui data tim'
                }
            >
                <form>
                    <Stack spacing={6}>
                        <FormControl>
                            <FormLabel>Nama</FormLabel>
                            <Input
                                name='name'
                                type='text'
                                maxLength={45}
                                disabled={!isEdit}
                                value={value.name}
                                onChange={handleOnChange}
                                isRequired
                            />
                            <FormHelperText>
                                Nama team yang akan ubah
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormLabel>ID Pimpinan</FormLabel>
                            <Input
                                name='head_id'
                                type='text'
                                maxLength={45}
                                disabled={!isEdit}
                                isRequired
                                value={value.head_id}
                                onChange={handleOnChange}
                            />
                            <FormHelperText>
                                Isi sesuai ID pada menu <b>Heads</b>
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Nama Pimpinan</FormLabel>
                            <Input
                                type='text'
                                maxLength={45}
                                isDisabled
                                value={team.head_name}
                            />
                        </FormControl>

                        <Box>
                            <FormLabel>Deskripsi</FormLabel>
                            <Textarea
                                type='text'
                                rows={8}
                                disabled={!isEdit}
                                name='description'
                                value={value.description}
                                onChange={handleOnChange}
                            />
                        </Box>

                        <PermissionMiddleware
                            permisionKey={'edit teams action'}
                        >
                            <Flex align={'center'} justifyContent={'end'}>
                                {isEdit ? (
                                    <Button
                                        colorScheme={'blue'}
                                        onClick={handleSave}
                                    >
                                        Simpan
                                    </Button>
                                ) : (
                                    <Button
                                        colorScheme={'green'}
                                        onClick={() => setIsEdit(true)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </Flex>
                        </PermissionMiddleware>
                    </Stack>
                </form>
            </Wrapper>

            <PermissionMiddleware permisionKey={'view assign teams'}>
                <Wrapper
                    title={'Assign Employee to Team'}
                    description={
                        'Menu ini digunakan untuk menambahkan karyawan ke team'
                    }
                >
                    <AlertResponseError
                        error={
                            error?.error?.includes('SQLSTATE[23000]')
                                ? {
                                      message: 'User sudah ada pada tim.',
                                  }
                                : error
                        }
                        status={status}
                        my={4}
                    />

                    <VStack spacing={6}>
                        <FormControl>
                            <FormLabel>ID Karyawan</FormLabel>

                            <Flex align={'center'}>
                                <Input
                                    type='number'
                                    maxLength={45}
                                    value={userId}
                                    pattern='[0-9]*'
                                    placeholder='Masukkan ID Karyawan'
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                <Button
                                    colorScheme={'blue'}
                                    leftIcon={<HiPlus />}
                                    ml={2}
                                    onClick={handleAddUserToTeam}
                                >
                                    Tambah
                                </Button>
                            </Flex>

                            <FormHelperText>
                                Isi sesuai ID pada menu <b>Employes</b>
                            </FormHelperText>
                        </FormControl>
                    </VStack>

                    <Box mt={6}>
                        <TableBasic columns={columns} data={data} />
                    </Box>
                </Wrapper>
            </PermissionMiddleware>
        </Stack>
    );
};

export default TeamDetailPage;
