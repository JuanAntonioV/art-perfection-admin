import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
import { textParser } from '@/helpers/text-helper';
import {
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
    Stack,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { FaReadme } from 'react-icons/fa';

export default function MotivationSection() {
    const [employeVote, setEmployeVote] = useState([
        {
            id: 1,
            full_name: 'Rizky',
            content:
                'Hari Indah dasijdoiasjdoi ajoisdjaoi sjdoiaj odjaso asdjaoisj doia sjiod jaiso jdioas jdoia jsiodjasod aisojdoias jdioajs doaj sdio adsioj asjidj aosidjoas jdioa sjioijd oias djoiasjdoijasoid joiasdj',
            postDate: '07:20',
        },
        {
            id: 2,
            full_name: 'Rizky',
            content: 'Hari Indah',
            postDate: '07:20',
        },
        {
            id: 3,
            full_name: 'Rizky',
            content: 'Hari Indah',
            postDate: '07:20',
        },
        {
            id: 4,
            full_name: 'Rizky',
            content: 'Hari Indah',
            postDate: '07:20',
        },
        {
            id: 5,
            full_name: 'Rizky',
            content: 'Hari Indah',
            postDate: '07:20',
        },
    ]);

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
                Header: 'Action',
                accessor: 'action',
            },
        ],
        []
    );

    const handleViewDetail = (id) => {
        console.log(id);
        openMotivation();
    };

    const data = useMemo(() => {
        return employeVote.map((employe) => {
            return {
                id: employe.id,
                motivation: textParser(employe.content, 50),
                name: employe.full_name,
                postDate: employe.postDate,
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
                            onClick={() => handleViewDetail(employe.id)}
                        >
                            <FaReadme size={20} />
                        </IconButton>
                    </Box>
                ),
            };
        });
    }, [employeVote]);

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
        console.log('create motivation');
        openCreateMotivation();
    };

    const handleSubmitCreateMotivation = (e) => {
        e.preventDefault();
        console.log('submit create motivation');
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

                    <DrawerBody>
                        {
                            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum?'
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
