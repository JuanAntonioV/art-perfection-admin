import {
    Box,
    Button,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const ChangePassword = () => {
    const [show, setShow] = useState(false);

    const handlePasswordShow = () => setShow(!show);

    return (
        <Box bg={'white'} p={6} rounded={'lg'}>
            <Stack
                spacing={1}
                borderBottom={'1px'}
                borderColor={'gray.200'}
                pb={4}
            >
                <Heading as='h3' size='md'>
                    Change Password
                </Heading>

                <Text fontSize={'sm'} color={'gray.500'}>
                    Menu untuk mengelola data user yang login pada sistem.
                </Text>
            </Stack>

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
        </Box>
    );
};

export default ChangePassword;
