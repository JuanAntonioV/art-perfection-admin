import { Badge, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import StatSection from './partials/StatSection';
import DefaultLineChart from '@/components/charts/DefaultLineChart';
import { dateParser } from '@/helpers/dateHelper';

const DashboardPage = () => {
    // generate random data 30 days with the key of date and have the value of kehadiran, kedisiplinan, kemandirian, saran, ketepatan, progress and the value is random number between 0 and 4 and not allow decimal
    const data = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            date: dateParser(date),
            kehadiran: Math.floor(Math.random() * 4) + 1,
            kedisiplinan: Math.floor(Math.random() * 4) + 1,
            kemandirian: Math.floor(Math.random() * 4) + 1,
            saran: Math.floor(Math.random() * 4) + 1,
            ketepatan: Math.floor(Math.random() * 4) + 1,
            progress: Math.floor(Math.random() * 4) + 1,
        };
    });

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
                                colorScheme='red'
                                rounded={'sm'}
                                px={4}
                                py={1}
                                w={{ base: 'auto', md: '100%', lg: 'auto' }}
                                textAlign={{ base: 'left', md: 'center' }}
                            >
                                1: Sangat Tidak Sesuai
                            </Badge>
                            <Badge
                                colorScheme='red'
                                rounded={'sm'}
                                px={4}
                                py={1}
                                w={{ base: 'auto', md: '100%', lg: 'auto' }}
                                textAlign={{ base: 'left', md: 'center' }}
                            >
                                2: Tidak Sesuai
                            </Badge>
                            <Badge
                                colorScheme='green'
                                rounded={'sm'}
                                px={4}
                                py={1}
                                w={{ base: 'auto', md: '100%', lg: 'auto' }}
                                textAlign={{ base: 'left', md: 'center' }}
                            >
                                3: Sesuai
                            </Badge>
                            <Badge
                                colorScheme='green'
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
