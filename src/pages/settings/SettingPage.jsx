import AlertResponseError from '@/components/alerts/AlertResponseError';
import AlertDeleteDialog from '@/components/dialogs/AlertDeleteDialog';
import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
import { dateParser } from '@/helpers/date-helper';
import {
    createHolidayThunk,
    deleteHolidayThunk,
    getAllHolidayThunk,
} from '@/stores/thunks/holidayThunk';
import {
    Box,
    Button,
    FormLabel,
    IconButton,
    Input,
    Stack,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { TiWarningOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';

const SettingPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const { holidays, status, error } = useSelector((state) => state.holiday);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedHoliday, setSelectedHoliday] = useState(null);

    const [form, setForm] = useState({
        title: '',
        description: '',
        date: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title: form.title,
            description: form.description,
            date: form.date,
            token: token,
        };

        dispatch(createHolidayThunk(payload)).then((res) => {
            if (res.payload?.code === 200) {
                setForm({ title: '', description: '', date: '' });
                dispatch(getAllHolidayThunk(token));
            }
        });
    };

    useEffect(() => {
        dispatch(getAllHolidayThunk(token));
    }, [dispatch, token]);

    const handleDelete = (id) => {
        const payload = {
            id: id,
            token: token,
        };

        dispatch(deleteHolidayThunk(payload)).then((res) => {
            if (res.payload?.code === 200) {
                dispatch(getAllHolidayThunk(token));
            }
        });
    };

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Judul',
                accessor: 'title',
            },
            {
                Header: 'Keterangan',
                accessor: 'description',
            },
            {
                Header: 'Tanggal Libur',
                accessor: 'date',
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
        return holidays.map((holiday) => {
            return {
                count: count++,
                title: holiday.title,
                description: holiday.description,
                date: dateParser(holiday.date),
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
                            onClick={() => {
                                setSelectedHoliday(holiday);
                                onOpen();
                            }}
                        >
                            <TiWarningOutline size={20} />
                        </IconButton>
                    </Box>
                ),
            };
        });
    }, [holidays]);

    return (
        <>
            <AlertDeleteDialog
                isOpen={isOpen}
                onClose={onClose}
                title={'Hapus Hari Libur'}
                detail={'Apakah anda yakin ingin menghapus hari libur ini?'}
                btnText={'Hapus'}
                btnColor={'red'}
                action={handleDelete}
                id={selectedHoliday?.id}
            />

            <Stack spacing={6}>
                <Wrapper
                    title={'Tambah Hari Libur'}
                    description={
                        'Pengaturan ini untuk menambahkan hari libur pada sistem.'
                    }
                >
                    <AlertResponseError status={status} error={error} my={4} />

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <Box>
                                <FormLabel>Judul Hari Libur</FormLabel>
                                <Input
                                    type='text'
                                    maxLength={45}
                                    name='title'
                                    placeholder='e.g. Libur Hari Buruh Nasional'
                                    required
                                    value={form.title}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Keterangan</FormLabel>
                                <Textarea
                                    maxLength={255}
                                    name='description'
                                    placeholder='e.g. Libur Hari Buruh Nasional'
                                    required
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Tanggal Libur</FormLabel>
                                <Input
                                    type='date'
                                    name='date'
                                    placeholder='e.g. Libur Hari Buruh Nasional'
                                    required
                                    value={form.date}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <Button
                                    type='submit'
                                    colorScheme='blue'
                                    size={'md'}
                                    px={12}
                                    mt={6}
                                    isDisabled={
                                        form.title === '' ||
                                        form.description === '' ||
                                        form.date === ''
                                    }
                                >
                                    Simpan
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Wrapper>

                <Wrapper
                    title={'Hari Libur'}
                    description={
                        'Pengaturan ini untuk mengelola data hari libur yang ada pada sistem.'
                    }
                >
                    <TableBasic columns={columns} data={data} />
                </Wrapper>
            </Stack>
        </>
    );
};

export default SettingPage;
