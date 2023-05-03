import {
    Badge,
    Box,
    Flex,
    Grid,
    Heading,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react';

import StatSection from './partials/StatSection';
import DefaultLineChart from '@/components/charts/DefaultLineChart';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/stores/thunks/authThunk';
import {
    getGlobalAnalytics,
    getUserAnalytics,
} from '@/stores/thunks/analyticsThunk';
import { logoutAction } from '@/stores/reducers/authReducer';
import PermissionMiddleware from '@/routes/middleware/PermissionMiddleware';
import { getAllHolidayThunk } from '@/stores/thunks/holidayThunk';
import VoteSection from './partials/VoteSection';
import HolidaySection from '@/pages/dashboard/partials/HolidaySection';
import MotivationSection from '@/pages/dashboard/partials/MotivationSection';
import DataVoteSection from './partials/DataVoteSection';
import DataNoVoteSection from './partials/DataNoVoteSection';

const DashboardPage = () => {
    // generate random data 30 days with the key of date and have the value of kehadiran, kedisiplinan, kemandirian, saran, ketepatan, progress and the value is random number between 0 and 4, and also plus the last value to the current date
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const data = [];

    //     for (let i = 0; i < 30; i++) {
    //         const date = new Date();
    //         date.setDate(date.getDate() - i);

    //         data.push({
    //             date: dateParser(date),
    //             kehadiran:
    //                 Math.floor(Math.random() * 4) +
    //                 1 +
    //                 (i === 0 ? 0 : data[i - 1].kehadiran),
    //             kedisiplinan:
    //                 Math.floor(Math.random() * 4) +
    //                 1 +
    //                 (i === 0 ? 0 : data[i - 1].kedisiplinan),
    //             kemandirian:
    //                 Math.floor(Math.random() * 4) +
    //                 1 +
    //                 (i === 0 ? 0 : data[i - 1].kemandirian),
    //             saran:
    //                 Math.floor(Math.random() * 4) +
    //                 1 +
    //                 (i === 0 ? 0 : data[i - 1].saran),
    //             ketepatan:
    //                 Math.floor(Math.random() * 4) +
    //                 1 +
    //                 (i === 0 ? 0 : data[i - 1].ketepatan),
    //             progress:
    //                 Math.floor(Math.random() * 4) +
    //                 1 +
    //                 (i === 0 ? 0 : data[i - 1].progress),
    //             iSangatTidakSesuai:
    //                 1 + (i === 0 ? 0 : data[i - 1].iSangatTidakSesuai),
    //             iTidakSesuai: 2 + (i === 0 ? 0 : data[i - 1].iTidakSesuai),
    //             iSesuai: 3 + (i === 0 ? 0 : data[i - 1].iSesuai),
    //             iSangatSesuai: 4 + (i === 0 ? 0 : data[i - 1].iSangatSesuai),
    //         });

    //         setData(data);
    //     }
    // }, []);

    const dispatch = useDispatch();
    const { userAnalytics, error: analyticError } = useSelector(
        (state) => state.analytics
    );
    const {
        token,
        user,
        status: authStatus,
    } = useSelector((state) => state.auth);

    useEffect(() => {
        const payload = {
            id: user?.id,
            token: token,
        };

        if (user?.role === 'employee') {
            dispatch(getUserAnalytics(payload));
        }
    }, [user]);

    useEffect(() => {
        dispatch(getAllHolidayThunk(token));
    }, [token]);

    useEffect(() => {
        dispatch(getUser(token)).then((res) => {
            if (res.payload.code === 401) dispatch(logoutAction(token));
        });
    }, [dispatch]);

    // const indicators = [
    //     {
    //         name: 'Sangat Tidak Sesuai',
    //         value: 1,
    //     },
    //     {
    //         name: 'Tidak Sesuai',
    //         value: 2,
    //     },
    //     {
    //         name: 'Sesuai',
    //         value: 3,
    //     },
    //     {
    //         name: 'Sangat Sesuai',
    //         value: 4,
    //     },
    // ];

    return (
        <>
            <Stack spacing={10}>
                <PermissionMiddleware permisionKey={'view stats'}>
                    <StatSection />
                </PermissionMiddleware>

                {user?.role !== 'admin' ? (
                    <Grid
                        templateColumns={{
                            base: 'repeat(1, 1fr)',
                            md: 'repeat(2, 1fr)',
                        }}
                        gap={6}
                    >
                        <PermissionMiddleware
                            permisionKey={'view dashboard vote'}
                            roleKeyException={'admin'}
                        >
                            <VoteSection />
                        </PermissionMiddleware>
                        <PermissionMiddleware
                            permisionKey={'view dashboard holiday list'}
                            roleKeyException={'admin'}
                        >
                            <HolidaySection />
                        </PermissionMiddleware>
                    </Grid>
                ) : null}

                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                    }}
                    gap={6}
                >
                    <DataNoVoteSection />
                    <DataVoteSection />
                </Grid>

                <MotivationSection />

                <PermissionMiddleware
                    permisionKey={'view dashboard user chart'}
                    roleKeyException={'admin'}
                >
                    <Box bg={'white'} p={6} rounded={'lg'}>
                        <Stack
                            spacing={1}
                            borderBottom={'1px'}
                            borderColor={'gray.200'}
                            pb={4}
                        >
                            <Heading as='h3' size='md'>
                                Analisis Data Vote
                            </Heading>

                            <Text fontSize={'sm'} color={'gray.500'}>
                                Menu ini berisi informasi mengenai data vote
                                yang ada pada sistem.
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

                            {!analyticError && userAnalytics ? (
                                <Skeleton
                                    isLoaded={
                                        userAnalytics &&
                                        authStatus === 'success'
                                    }
                                >
                                    <DefaultLineChart data={userAnalytics} />
                                </Skeleton>
                            ) : (
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Data tidak ditemukan
                                </Text>
                            )}
                        </Box>
                    </Box>
                </PermissionMiddleware>
            </Stack>
        </>
    );
};

export default DashboardPage;
