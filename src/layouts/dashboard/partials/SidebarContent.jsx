import { Box, CloseButton, Flex, Image, Text } from '@chakra-ui/react';
import {
    FiStar,
    RxDashboard,
    RiUserStarLine,
    FiSettings,
    TbBrandGoogleAnalytics,
} from 'react-icons/all';

import { HiOutlineUsers } from 'react-icons/hi';

import NavbarItem from './NavbarItem';
import PermissionMiddleware from '@/routes/middleware/PermissionMiddleware';

import Logo from '@/assets/logo.png';

const SidebarContent = ({ onClose, ...rest }) => {
    const LinkItems = [
        {
            name: 'Dashboard',
            icon: RxDashboard,
            to: '/dashboard',
            devider: true,
            permision: 'view dashboard',
        },
        {
            name: 'Head',
            icon: RiUserStarLine,
            to: '/head',
            devider: false,
            permision: 'view head menu',
        },
        {
            name: 'Employee',
            icon: HiOutlineUsers,
            to: '/employee',
            devider: false,
            permision: 'view employee menu',
        },
        {
            name: 'Teams',
            icon: FiStar,
            to: '/teams',
            devider: false,
            permision: 'view teams menu',
        },
        {
            name: 'Analytics',
            icon: TbBrandGoogleAnalytics,
            to: '/analytics',
            devider: true,
            permision: 'view analytics menu',
        },
        {
            name: 'Settings',
            icon: FiSettings,
            to: '/settings',
            devider: false,
            permision: 'view settings menu',
        },
    ];

    return (
        <Box
            transition='3s ease'
            bg={'gray.800'}
            textColor={'white'}
            borderRight='1px'
            borderRightColor={'gray.200'}
            w={{ base: 'full', md: 60 }}
            pos='fixed'
            h='full'
            {...rest}
        >
            <Flex
                h='20'
                alignItems='center'
                mx='8'
                mb={{ base: '0', md: '4' }}
                justifyContent='space-between'
            >
                <Box
                    display={{ base: 'flex' }}
                    flex={{ base: 1 }}
                    justifyContent={{ base: 'center' }}
                >
                    <Image src={Logo} alt='AP Group' w={12} />
                </Box>
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>

            {LinkItems.map((link, index) => (
                <PermissionMiddleware key={index} permisionKey={link.permision}>
                    <NavbarItem
                        icon={link.icon}
                        link={link.to}
                        onClick={onClose}
                    >
                        {link.name}
                    </NavbarItem>

                    {link.devider ? (
                        <Box mx='8' my='2' h='px' bg='gray.600' />
                    ) : null}
                </PermissionMiddleware>
            ))}
        </Box>
    );
};

export default SidebarContent;
