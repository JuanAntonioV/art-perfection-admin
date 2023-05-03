import AlertResponseError from '@/components/alerts/AlertResponseError';
import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
import { createTeam } from '@/stores/thunks/teamsThunk';
import {
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
import { TiTrash, TiWarningOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TeamCreatePage = () => {
    // const employes = useSelector((state) => state.employes.employes);

    // const handleDelete = (id) => {
    //     console.log('ID Employe', id);
    // };

    // const columns = useMemo(
    //     () => [
    //         {
    //             Header: '#',
    //             accessor: 'count',
    //         },
    //         {
    //             Header: 'ID',
    //             accessor: 'id',
    //         },
    //         {
    //             Header: 'Name',
    //             accessor: 'name',
    //         },
    //         {
    //             Header: 'Email',
    //             accessor: 'email',
    //         },
    //         {
    //             Header: 'Action',
    //             accessor: 'action',
    //         },
    //     ],
    //     []
    // );

    // const data = useMemo(() => {
    //     let count = 1;
    //     return employes.map((employe) => {
    //         return {
    //             count: count++,
    //             id: employe.id,
    //             name: employe.name,
    //             email: employe.email,
    //             action: (
    //                 <Box>
    //                     <IconButton
    //                         size='sm'
    //                         ml={2}
    //                         textColor={'red'}
    //                         bg={'transparent'}
    //                         _hover={{
    //                             bg: 'red',
    //                             textColor: 'white',
    //                         }}
    //                         onClick={() => handleDelete(employe.id)}
    //                     >
    //                         <TiTrash size={20} />
    //                     </IconButton>
    //                 </Box>
    //             ),
    //         };
    //     });
    // }, [employes]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        description: '',
        head_id: '',
    });
    const token = useSelector((state) => state.auth.token);

    const { error, status } = useSelector((state) => state.team);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            token: token,
            name: form.name,
            description: form.description,
            head_id: form.head_id,
        };

        dispatch(createTeam(payload)).then((res) => {
            res.payload.status ? navigate('/teams') : null;
        });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Stack spacing={6}>
            <Wrapper
                title={'Team Create'}
                description={'Menu ini digunakan untuk membuat team'}
            >
                <AlertResponseError
                    error={
                        error?.error?.includes('SQLSTATE[23000]')
                            ? {
                                  message: 'Nama tim sudah ada pada tim lain.',
                              }
                            : error
                    }
                    status={status}
                    my={4}
                />

                <form onSubmit={handleSubmit}>
                    <Stack spacing={6}>
                        <FormControl>
                            <FormLabel>Nama</FormLabel>
                            <Input
                                type='text'
                                maxLength={45}
                                placeholder='Masukkan nama tim'
                                name='name'
                                onChange={handleChange}
                            />
                            <FormHelperText>
                                Nama team yang akan dibuat
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormLabel>ID Pimpinan</FormLabel>
                            <Input
                                type='text'
                                maxLength={45}
                                placeholder='Masukkan ID Pemimpin'
                                name='head_id'
                                onChange={handleChange}
                            />
                            <FormHelperText>
                                Isi sesuai ID pada menu <b>Heads</b>
                            </FormHelperText>
                        </FormControl>

                        <Box>
                            <FormLabel>Deskripsi</FormLabel>
                            <Textarea
                                type='text'
                                rows={8}
                                placeholder='Deskripsi tim'
                                name='description'
                                onChange={handleChange}
                            />
                        </Box>

                        <Box
                            mt={8}
                            display={'flex'}
                            justifyContent={'flex-end'}
                        >
                            <Button
                                type='submit'
                                colorScheme={'blue'}
                                isDisabled={
                                    form.name === '' || form.head_id === ''
                                }
                            >
                                Buat tim
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Wrapper>

            {/* <Wrapper
                title={'Assign Employee to Team'}
                description={
                    'Menu ini digunakan untuk menambahkan karyawan ke team'
                }
            >
                <VStack spacing={6}>
                    <FormControl>
                        <FormLabel>ID Karyawan</FormLabel>

                        <Flex align={'center'}>
                            <Input type='text' maxLength={45} />
                            <Button
                                colorScheme={'blue'}
                                leftIcon={<HiPlus />}
                                ml={2}
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
            </Wrapper> */}
        </Stack>
    );
};

export default TeamCreatePage;
