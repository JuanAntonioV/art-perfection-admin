import AlertResponseError from '@/components/alerts/AlertResponseError';
import AlertResponseInfo from '@/components/alerts/AlertResponseInfo';
import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
import { textParser } from '@/helpers/text-helper';
import {
    createMotivation,
    getAllMotivation,
    getMotivationById,
} from '@/stores/thunks/motivationThunk';
import {
    Badge,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormLabel,
    IconButton,
    Input,
    Stack,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaReadme } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

export default function MotivationSection() {
    const dispatch = useDispatch();
    const { motivations, motivation, error, status } = useSelector(
        (state) => state.motivation
    );
    const token = useSelector((state) => state.auth.token);
    const [motivationForm, setMotivationForm] = useState({
        motivation: '',
    });

    useEffect(() => {
        dispatch(getAllMotivation(token));
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Motivasi',
                accessor: 'motivation',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Jam',
                accessor: 'postDate',
            },
            {
                Header: 'Status',
                accessor: 'status',
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

        dispatch(getMotivationById(payload)).then((res) => {
            res.payload.status ? openMotivation() : null;
        });
    };

    const data = useMemo(() => {
        return motivations.map((motiv) => {
            return {
                id: motiv.id,
                motivation: textParser(motiv.content, 50),
                name: motiv.full_name,
                postDate: motiv.post_hours,
                status: (
                    <Badge
                        px={3}
                        py={1}
                        bg={!motiv.isLate ? 'green.400' : 'red'}
                        textColor={'white'}
                        rounded={'md'}
                        fontSize={'x-small'}
                    >
                        {motiv.isLate ? 'Telat' : 'Tepat Waktu'}
                    </Badge>
                ),
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
                            onClick={() => handleViewDetail(motiv.id)}
                        >
                            <FaReadme size={20} />
                        </IconButton>
                    </Box>
                ),
            };
        });
    }, [motivations]);

    const {
        isOpen: isOpenMotivation,
        onOpen: openMotivation,
        onClose: closeMotivation,
    } = useDisclosure();
    const {
        isOpen: isOpenCreateMotivation,
        onOpen: openCreateMotivation,
        onClose: closeCreateMotivation,
    } = useDisclosure();
    const btnRef = useRef();

    const handleCreateMotivation = () => {
        openCreateMotivation();
    };

    const handleSubmitCreateMotivation = (e) => {
        e.preventDefault();

        const payload = {
            token: token,
            content: motivationForm.motivation,
        };

        dispatch(createMotivation(payload)).then((res) => {
            if (res.payload.status) {
                dispatch(getAllMotivation(token));
                closeCreateMotivation();
            }
        });
    };

    const handleChange = (e) => {
        setMotivationForm({
            ...motivationForm,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Drawer
                isOpen={isOpenMotivation}
                placement='right'
                onClose={closeMotivation}
                finalFocusRef={btnRef}
                size={'sm'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Lihat motivasi</DrawerHeader>

                    <AlertResponseInfo status={status} info={error?.message} />

                    <DrawerBody>
                        {
                            motivation ? (
                                <Stack spacing={6}>
                                    <Box>
                                        <FormLabel htmlFor='motivation'>
                                            Motivasi
                                        </FormLabel>
                                        <Textarea
                                            id='motivation'
                                            name='motivation'
                                            rows={8}
                                            value={motivation.content}
                                            readOnly
                                        />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor='name'>
                                            Nama
                                        </FormLabel>
                                        <Input
                                            id='name'
                                            name='name'
                                            value={motivation.full_name}
                                            readOnly
                                        />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor='postDate'>
                                            Jam Kirim
                                        </FormLabel>
                                        <Input
                                            id='postDate'
                                            name='postDate'
                                            value={motivation.post_hours}
                                            readOnly
                                        />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor='postDate'>
                                            Status
                                        </FormLabel>
                                        <Badge
                                            px={3}
                                            py={1}
                                            bg={
                                                !motivation?.isLate
                                                    ? 'green.400'
                                                    : 'red'
                                            }
                                            textColor={'white'}
                                            rounded={'md'}
                                            fontSize={'xs'}
                                        >
                                            {motivation?.isLate
                                                ? 'Telat'
                                                : 'Tepat Waktu'}
                                        </Badge>
                                    </Box>
                                </Stack>
                            ) : null // TODO: add skeleton
                        }
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant='outline'
                            mr={3}
                            onClick={closeMotivation}
                        >
                            Tutup
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Drawer
                isOpen={isOpenCreateMotivation}
                placement='right'
                onClose={closeCreateMotivation}
                finalFocusRef={btnRef}
                size={'sm'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Buat motivasi</DrawerHeader>

                    <DrawerBody>
                        <form onSubmit={handleSubmitCreateMotivation}>
                            <Stack spacing={6}>
                                <Box>
                                    <FormLabel htmlFor='motivation'>
                                        Motivasi
                                    </FormLabel>
                                    <Textarea
                                        id='motivation'
                                        name='motivation'
                                        rows={5}
                                        value={motivationForm.motivation}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Stack>

                            <Button
                                mt={4}
                                colorScheme='teal'
                                type='submit'
                                onClick={closeCreateMotivation}
                            >
                                Kirim
                            </Button>
                        </form>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant='outline'
                            mr={3}
                            onClick={closeCreateMotivation}
                        >
                            Tutup
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Wrapper
                title='Motivasi'
                description='Keterangan list motivasi yang dikirim.'
            >
                <TableBasic
                    columns={columns}
                    data={data}
                    addAction={handleCreateMotivation}
                />
            </Wrapper>
        </>
    );
}
