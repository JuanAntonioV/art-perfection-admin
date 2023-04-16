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
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { FaUserAlt, FaUserFriends } from 'react-icons/fa';
import { RiUserStarFill } from 'react-icons/ri';

const StatSection = () => {
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
                            <StatLabel>Total Teams</StatLabel>
                            <StatNumber>20</StatNumber>
                            <StatHelpText>Dari awal bulan</StatHelpText>
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
                            <StatNumber>50</StatNumber>
                            <StatHelpText>Dari awal bulan</StatHelpText>
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
                            <StatNumber>345</StatNumber>
                            <StatHelpText>Dari awal bulan</StatHelpText>
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
                            <StatNumber>201</StatNumber>
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
