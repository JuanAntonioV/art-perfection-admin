import { getStats } from '@/stores/thunks/statsThunk';
import {
    Box,
    Flex,
    GridItem,
    Stack,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
    BsFillCalendar2CheckFill,
    FaUserAlt,
    FaUserFriends,
    RiUserStarFill,
} from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';

const StatSection = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const stats = useSelector((state) => state.stat.stats);

    useEffect(() => {
        dispatch(getStats(token));
    }, [dispatch]);

    return (
        <StatGroup
            display={'grid'}
            gridTemplateColumns={'repeat(4, 1fr)'}
            gap={4}
        >
            <GridItem colSpan={{ base: 4, md: 2, lg: 1 }}>
                <Stat bg={'white'} p={4} rounded={'lg'} shadow={'lg'}>
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Stack spacing={1}>
                            <StatLabel>Total Tim</StatLabel>
                            <StatNumber>{stats.total_teams}</StatNumber>
                            <StatHelpText>Dari semua tim aktif</StatHelpText>
                        </Stack>

                        <Box
                            w={14}
                            h={14}
                            bg={'blue.400'}
                            rounded={'full'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <RiUserStarFill color={'white'} size={26} />
                        </Box>
                    </Flex>
                </Stat>
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 2, lg: 1 }}>
                <Stat bg={'white'} p={4} rounded={'lg'} shadow={'lg'}>
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Stack spacing={1}>
                            <StatLabel>Total Pimpinan</StatLabel>
                            <StatNumber>{stats.total_heads}</StatNumber>
                            <StatHelpText>Dari semua pengguna</StatHelpText>
                        </Stack>

                        <Box
                            w={14}
                            h={14}
                            bg={'purple.400'}
                            rounded={'full'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <FaUserAlt color={'white'} size={22} />
                        </Box>
                    </Flex>
                </Stat>
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 2, lg: 1 }}>
                <Stat bg={'white'} p={4} rounded={'lg'} shadow={'lg'}>
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Stack spacing={1}>
                            <StatLabel>Total Anggota</StatLabel>
                            <StatNumber>{stats.total_employee}</StatNumber>
                            <StatHelpText>Dari semua pengguna</StatHelpText>
                        </Stack>

                        <Box
                            w={14}
                            h={14}
                            bg={'cyan.400'}
                            rounded={'full'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <FaUserFriends color={'white'} size={26} />
                        </Box>
                    </Flex>
                </Stat>
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 2, lg: 1 }}>
                <Stat bg={'white'} p={4} rounded={'lg'} shadow={'lg'}>
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Stack spacing={1}>
                            <StatLabel>Total Votes</StatLabel>
                            <StatNumber>{stats.total_votes}</StatNumber>
                            <StatHelpText>Dari hari ini</StatHelpText>
                        </Stack>

                        <Box
                            w={14}
                            h={14}
                            bg={'red.400'}
                            rounded={'full'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <BsFillCalendar2CheckFill
                                color={'white'}
                                size={22}
                            />
                        </Box>
                    </Flex>
                </Stat>
            </GridItem>
        </StatGroup>
    );
};

export default StatSection;
