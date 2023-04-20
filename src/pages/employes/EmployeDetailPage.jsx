import DefaultLineChart from '@/components/charts/DefaultLineChart';
import Wrapper from '@/components/wrappers/Wrapper';
import { dateParser } from '@/helpers/dateHelper';
import {
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Stack,
    Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaRegQuestionCircle } from 'react-icons/fa';

const EmployeDetailPage = () => {
    const [show, setShow] = useState(false);

    const handlePasswordShow = () => setShow(!show);

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

    return (
        <Stack spacing={8}>
            <Grid
                templateColumns={{
                    base: '1fr',
                    md: '1fr 1fr',
                }}
                gap={4}
            >
                <Wrapper
                    title={'Detail Employe'}
                    description={
                        'Menu ini digunakan untuk melihat detail employe'
                    }
                >
                    <Stack spacing={6}>
                        <FormControl>
                            <FormLabel>Nama</FormLabel>
                            <Input type='text' maxLength={45} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' maxLength={45} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Tanggal Registrasi</FormLabel>
                            <Input type='date' maxLength={45} disabled />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize={'sm'}>Role</FormLabel>
                            <Select placeholder='Pilih role'>
                                <option value='admin'>Admin</option>
                                <option value='employe'>Employe</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize={'sm'}>Status</FormLabel>
                            <Flex align='center' columnGap={1}>
                                <Badge
                                    variant='solid'
                                    colorScheme='green'
                                    py={1}
                                    px={4}
                                    rounded={'md'}
                                >
                                    Aktif
                                </Badge>

                                <Tooltip
                                    label='Status aktif menunjukkan bahwa employe dapat melakukan login'
                                    placement='right'
                                    bg={'yellow.100'}
                                    color={'black'}
                                    fontSize={'sm'}
                                    hasArrow
                                    px={3}
                                    py={1.5}
                                    rounded={'sm'}
                                >
                                    <Button
                                        w={'fit-content'}
                                        h={'fit-content'}
                                        p={'0'}
                                        disabled
                                        bg={'transparent'}
                                        _hover={{
                                            bg: 'transparent',
                                        }}
                                    >
                                        <FaRegQuestionCircle
                                            size={18}
                                            color={'cyan'}
                                        />
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </FormControl>

                        <Box>
                            <Button
                                type='submit'
                                colorScheme='blue'
                                w={'full'}
                                size={'md'}
                                mt={6}
                            >
                                Simpan
                            </Button>
                        </Box>
                    </Stack>
                </Wrapper>

                <Wrapper
                    title={'Change Password'}
                    description={
                        'Menu ini digunakan untuk mengubah password employe'
                    }
                >
                    <Box mt={4}>
                        <Stack spacing={4}>
                            <Stack>
                                <FormLabel fontSize={'sm'} mb={1}>
                                    Password baru
                                </FormLabel>
                                <InputGroup size={'md'}>
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        placeholder='••••••••'
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button
                                            h='1.75rem'
                                            size='sm'
                                            onClick={handlePasswordShow}
                                            bg={'transparent'}
                                            _hover={{
                                                bg: 'transparent',
                                            }}
                                        >
                                            {show ? (
                                                <BsEyeSlash size={20} />
                                            ) : (
                                                <BsEye size={20} />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Stack>

                            <Stack>
                                <FormLabel fontSize={'sm'} mb={1}>
                                    Konfimasi password
                                </FormLabel>
                                <InputGroup size={'md'}>
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        placeholder='••••••••'
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button
                                            h='1.75rem'
                                            size='sm'
                                            onClick={handlePasswordShow}
                                            bg={'transparent'}
                                            _hover={{
                                                bg: 'transparent',
                                            }}
                                        >
                                            {show ? (
                                                <BsEyeSlash size={20} />
                                            ) : (
                                                <BsEye size={20} />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box mt={8} textAlign={'right'}>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            fontSize={'sm'}
                            type={'submit'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Wrapper>
            </Grid>

            <Wrapper
                title={'Employe Activity'}
                description={
                    'Menu ini digunakan untuk melihat aktivitas employe'
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
        </Stack>
    );
};

export default EmployeDetailPage;
