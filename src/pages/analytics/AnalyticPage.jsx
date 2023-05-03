import DefaultLineChart from '@/components/charts/DefaultLineChart';
import PermissionMiddleware from '@/routes/middleware/PermissionMiddleware';
import { getGlobalAnalytics } from '@/stores/thunks/analyticsThunk';
import {
    Badge,
    Box,
    Flex,
    Heading,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AnalyticPage() {
    const dispatch = useDispatch();
    const { analytics, status: analyticStatus } = useSelector(
        (state) => state.analytics
    );
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getGlobalAnalytics(token));
    }, [dispatch, token]);

    return (
        <PermissionMiddleware permisionKey={'view dashboard chart'}>
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
                        Menu ini berisi informasi mengenai data vote yang ada
                        pada sistem.
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

                    {analytics ? (
                        <Skeleton
                            isLoaded={analytics && analyticStatus === 'success'}
                        >
                            <DefaultLineChart data={analytics} />
                        </Skeleton>
                    ) : (
                        <Text fontSize={'sm'} color={'gray.500'}>
                            Data tidak ditemukan
                        </Text>
                    )}
                </Box>
            </Box>
        </PermissionMiddleware>
    );
}
