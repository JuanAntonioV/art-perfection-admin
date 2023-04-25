import DefaultLineChart from '@/components/charts/DefaultLineChart';
import Wrapper from '@/components/wrappers/Wrapper';
import { getUserAnalytics } from '@/stores/thunks/analyticsThunk';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const EmployeeAnalytics = () => {
    const dispatch = useDispatch();
    const analytics = useSelector((state) => state.analytics.userAnalytics);
    const token = useSelector((state) => state.auth.token);

    const { id } = useParams();

    useEffect(() => {
        const payload = {
            id: id,
            token: token,
        };

        dispatch(getUserAnalytics(payload));
    }, [dispatch, id]);

    return (
        <Wrapper
            title={'Employe Activity'}
            description={'Menu ini digunakan untuk melihat aktivitas employe'}
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

                {analytics ? (
                    <DefaultLineChart data={analytics} />
                ) : (
                    <Text fontSize={'sm'} color={'gray.500'}>
                        Data tidak ditemukan
                    </Text>
                )}
            </Box>
        </Wrapper>
    );
};

export default EmployeeAnalytics;
