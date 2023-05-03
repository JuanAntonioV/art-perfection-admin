import { upperFirst } from '@/helpers/text-helper';
import { logout } from '@/stores/thunks/authThunk';
import {
    Avatar,
    Box,
    Flex,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FiChevronDown, FiMenu } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/logo.png';
import Profile from '@/assets/profile.png';

const MobileNav = ({ onOpen, ...rest }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(logout(token)).then((res) => {
            if (res.payload.data?.code === 200)
                navigate('/login', { replace: true });
        });
    };

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height='20'
            alignItems='center'
            bg={'white'}
            borderBottomWidth='1px'
            borderBottomColor={'gray.200'}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant='outline'
                aria-label='open menu'
                icon={<FiMenu />}
            />

            {/* <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize='2xl'
                fontFamily='monospace'
                fontWeight='bold'
            >
                AP Group
            </Text> */}

            <Box
                display={{ base: 'flex', md: 'none' }}
                flex={{ base: 1, md: 0 }}
                justifyContent={{ base: 'center', md: 'flex-start' }}
            >
                <Image src={Logo} alt='AP Group' w={12} />
            </Box>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition='all 0.3s'
                            _focus={{ boxShadow: 'none' }}
                        >
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={Profile}
                                    objectFit={'cover'}
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems='flex-start'
                                    spacing='1px'
                                    ml='2'
                                >
                                    <Text fontSize='sm'>{user?.full_name}</Text>
                                    <Text fontSize='xs' color='gray.600'>
                                        {user?.role === 'admin'
                                            ? 'Administrator'
                                            : user?.role === 'head'
                                            ? 'Pimpinan'
                                            : user?.role === 'anggota'
                                            ? 'Anggota'
                                            : 'Pengguna'}
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList bg={'white'} borderColor={'gray.200'}>
                            <MenuItem onClick={() => navigate('/profile')}>
                                Profile
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

export default MobileNav;
