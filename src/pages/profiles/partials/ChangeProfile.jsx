import {
    Badge,
    Box,
    Button,
    Flex,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
    Text,
    Tooltip,
    WrapItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ChangeProfile = () => {
    const user = useSelector((state) => state.auth.user);
    const [value, setValue] = useState({
        name: user.name,
        email: user.email,
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Box bg={'white'} p={6} rounded={'lg'}>
            <Stack
                spacing={1}
                borderBottom={'1px'}
                borderColor={'gray.200'}
                pb={4}
            >
                <Heading as='h3' size='md'>
                    Profiles
                </Heading>

                <Text fontSize={'sm'} color={'gray.500'}>
                    Menu untuk mengelola data akun.
                </Text>
            </Stack>

            <Box mt={4}>
                <Stack spacing={4}>
                    <Box>
                        <FormLabel fontSize={'sm'}>Nama</FormLabel>
                        <Input
                            type='text'
                            placeholder='e.g. John Doe'
                            value={user.name}
                            onChange={handleChange}
                            required
                        />

                        <FormLabel fontSize={'sm'} mt={4}>
                            Email
                        </FormLabel>
                        <Input
                            type='email'
                            placeholder='e.g. name@email.com'
                            value={user.email}
                            onChange={handleChange}
                            required
                        />

                        <FormLabel fontSize={'sm'} mt={4}>
                            Role
                        </FormLabel>
                        <Flex align='center' columnGap={1}>
                            {user.role === 'admin' ? (
                                <Badge
                                    variant='solid'
                                    colorScheme='green'
                                    py={1}
                                    px={4}
                                    rounded={'md'}
                                >
                                    Admin
                                </Badge>
                            ) : user.role === 'employee' ? (
                                <Badge
                                    variant='solid'
                                    colorScheme='blue'
                                    py={1}
                                    px={4}
                                    rounded={'md'}
                                >
                                    Employee
                                </Badge>
                            ) : user.role === 'head' ? (
                                <Badge
                                    variant='solid'
                                    colorScheme='red'
                                    py={1}
                                    px={4}
                                    rounded={'md'}
                                >
                                    Head
                                </Badge>
                            ) : (
                                <Badge
                                    variant='solid'
                                    colorScheme='yellow'
                                    py={1}
                                    px={4}
                                    rounded={'md'}
                                >
                                    Tidak diketahui
                                </Badge>
                            )}

                            <Tooltip
                                label='Role hanya dapat diubah oleh admin.'
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
                    </Box>
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
        </Box>
    );
};

export default ChangeProfile;
