import { Badge, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import StatSection from './partials/StatSection';
import DefaultLineChart from '@/components/charts/DefaultLineChart';
import { dateParser } from '@/helpers/dateHelper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '@/stores/thunks/authThunk';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    // generate random data 30 days with the key of date and have the value of kehadiran, kedisiplinan, kemandirian, saran, ketepatan, progress and the value is random number between 0 and 4, and also plus the last value to the current date
    const [data, setData] = useState([]);

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

            setData(data);
        }
    }, []);

    useEffect(() => {
        dispatch(getUser(token)).then((res) => {
            if (res.payload?.data?.status === 401) dispatch(logout(token));
        });
    }, [dispatch]);

    return (
        <>
            <Stack spacing={10}>
                <StatSection />

                <Box bg={'white'} p={6} rounded={'lg'}>
                    <Stack
                        spacing={1}
                        borderBottom={'1px'}
                        borderColor={'gray.200'}
                        pb={4}
                    >
                        <Heading as='h3' size='md'>
                            Dashboard
                        </Heading>

                        <Text fontSize={'sm'} color={'gray.500'}>
                            Menu ini berisi informasi mengenai data yang ada
                            pada votes system.
                        </Text>
                    </Stack>

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

                        <DefaultLineChart data={data} />
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default DashboardPage;
