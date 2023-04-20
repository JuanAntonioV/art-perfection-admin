import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
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
import { useMemo } from 'react';
import { HiPlus } from 'react-icons/hi';
import { TiTrash, TiWarningOutline } from 'react-icons/ti';
import { useSelector } from 'react-redux';

const TeamCreatePage = () => {
    const employes = useSelector((state) => state.employes.employes);

    const handleDelete = (id) => {
        console.log('ID Employe', id);
    };

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
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

    const data = useMemo(() => {
        let count = 1;
        return employes.map((employe) => {
            return {
                count: count++,
                id: employe.id,
                name: employe.name,
                email: employe.email,
                action: (
                    <Box>
                        <IconButton
                            size='sm'
                            ml={2}
                            textColor={'red'}
                            bg={'transparent'}
                            _hover={{
                                bg: 'red',
                                textColor: 'white',
                            }}
                            onClick={() => handleDelete(employe.id)}
                        >
                            <TiTrash size={20} />
                        </IconButton>
                    </Box>
                ),
            };
        });
    }, [employes]);

    return (
        <Stack spacing={6}>
            <Wrapper
                title={'Team Create'}
                description={'Menu ini digunakan untuk membuat team'}
            >
                <Stack spacing={6}>
                    <FormControl>
                        <FormLabel>Nama</FormLabel>
                        <Input type='text' maxLength={45} />
                        <FormHelperText>
                            Nama team yang akan dibuat
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>ID Pimpinan</FormLabel>
                        <Input type='text' maxLength={45} />
                        <FormHelperText>
                            Isi sesuai ID pada menu <b>Heads</b>
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Deskripsi</FormLabel>
                        <Textarea type='text' rows={8} />
                    </FormControl>
                </Stack>
            </Wrapper>

            <Wrapper
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

                <Box mt={8}>
                    <Button colorScheme={'blue'}>Simpan</Button>
                </Box>
            </Wrapper>
        </Stack>
    );
};

export default TeamCreatePage;
