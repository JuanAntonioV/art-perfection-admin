import DefaultLineChart from '@/components/charts/DefaultLineChart';
import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
import { dateParser } from '@/helpers/date-helper';
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
import { TiTrash, TiWarningOutline } from 'react-icons/ti';
import { useSelector } from 'react-redux';
const TeamDetailPage = () => {
    const [isEdit, setIsEdit] = useState(false);
    const employes = useSelector((state) => state.employes.employes);

    const handleDelete = (id) => {
        console.log('ID Employe', id);
    };

    const [dataReport, setDataReport] = useState([]);

    useEffect(() => {
        const data = [];

        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            data.push({
                date: dateParser(date),
                kehadiran:
                    Math.floor(Math.random() * 4) +
                    1 +
                    (i === 0 ? 0 : data[i - 1].kehadiran),
                kedisiplinan:
                    Math.floor(Math.random() * 4) +
                    1 +
                    (i === 0 ? 0 : data[i - 1].kedisiplinan),
                kemandirian:
                    Math.floor(Math.random() * 4) +
                    1 +
                    (i === 0 ? 0 : data[i - 1].kemandirian),
                saran:
                    Math.floor(Math.random() * 4) +
                    1 +
                    (i === 0 ? 0 : data[i - 1].saran),
                ketepatan:
                    Math.floor(Math.random() * 4) +
                    1 +
                    (i === 0 ? 0 : data[i - 1].ketepatan),
                progress:
                    Math.floor(Math.random() * 4) +
                    1 +
                    (i === 0 ? 0 : data[i - 1].progress),
                iSangatTidakSesuai:
                    1 + (i === 0 ? 0 : data[i - 1].iSangatTidakSesuai),
                iTidakSesuai: 2 + (i === 0 ? 0 : data[i - 1].iTidakSesuai),
                iSesuai: 3 + (i === 0 ? 0 : data[i - 1].iSesuai),
                iSangatSesuai: 4 + (i === 0 ? 0 : data[i - 1].iSangatSesuai),
            });

            setDataReport(data);
        }
    }, []);

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
                            disabled={!isEdit}
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
                title={'Laporan Karyawan'}
                description={
                    'Menu ini digunakan untuk melihat laporan karyawan'
                }
            >
                <Box mt={6}>
                    <Flex
                        flexDirection={{ base: 'column', lg: 'row' }}
                        justifyContent='start'
                        align={{ base: 'start', md: 'center' }}
                        gap={2}
                        mb={5}
                    >
                        <Badge
                            bg='#FF0000'
                            color={'white'}
                            rounded={'sm'}
                            px={4}
                            py={1}
                            w={{ base: 'auto', md: '100%', lg: 'auto' }}
                            textAlign={{ base: 'left', md: 'center' }}
                        >
                            1: Sangat Tidak Sesuai
                        </Badge>
                        <Badge
                            bg='#FFFF00'
                            color={'black'}
                            rounded={'sm'}
                            px={4}
                            py={1}
                            w={{ base: 'auto', md: '100%', lg: 'auto' }}
                            textAlign={{ base: 'left', md: 'center' }}
                        >
                            2: Tidak Sesuai
                        </Badge>
                        <Badge
                            bg={'#FF9900'}
                            color={'white'}
                            rounded={'sm'}
                            px={4}
                            py={1}
                            w={{ base: 'auto', md: '100%', lg: 'auto' }}
                            textAlign={{ base: 'left', md: 'center' }}
                        >
                            3: Sesuai
                        </Badge>
                        <Badge
                            bg={'#00FF00'}
                            color={'white'}
                            rounded={'sm'}
                            px={4}
                            py={1}
                            w={{ base: 'auto', md: '100%', lg: 'auto' }}
                            textAlign={{ base: 'left', md: 'center' }}
                        >
                            4: Sangat Sesuai
                        </Badge>
                    </Flex>

                    <DefaultLineChart data={dataReport} />
                </Box>
            </Wrapper>

            <Wrapper
                title={'Team Create'}
                description={'Menu ini digunakan untuk membuat team'}
            >
                <Flex align={'center'} justifyContent={'end'}>
                    {isEdit ? (
                        <Button
                            colorScheme={'blue'}
                            onClick={() => setIsEdit(false)}
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

                <Stack spacing={6}>
                    <FormControl>
                        <FormLabel>Nama</FormLabel>
                        <Input type='text' maxLength={45} disabled={!isEdit} />
                        <FormHelperText>
                            Nama team yang akan dibuat
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>ID Pimpinan</FormLabel>
                        <Input type='text' maxLength={45} disabled={!isEdit} />
                        <FormHelperText>
                            Isi sesuai ID pada menu <b>Heads</b>
                        </FormHelperText>
                    </FormControl>

                    <Box>
                        <FormLabel>Deskripsi</FormLabel>
                        <Textarea type='text' rows={8} disabled={!isEdit} />
                    </Box>
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
                            <Input
                                type='text'
                                maxLength={45}
                                disabled={!isEdit}
                            />
                            <Button
                                colorScheme={'blue'}
                                leftIcon={<HiPlus />}
                                ml={2}
                                disabled={!isEdit}
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
        </Stack>
    );
};

export default TeamDetailPage;
