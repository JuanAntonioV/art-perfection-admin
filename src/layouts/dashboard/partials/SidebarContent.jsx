import { Box, CloseButton, Flex, Text } from '@chakra-ui/react';
import {
    FiSettings,
    FiStar,
    RxDashboard,
    RiUserStarLine,
    TbBrandGoogleAnalytics,
} from 'react-icons/all';

import { HiOutlineUsers } from 'react-icons/hi';

import NavbarItem from './NavbarItem';

const SidebarContent = ({ onClose, ...rest }) => {
    const LinkItems = [
        {
            name: 'Dashboard',
            icon: RxDashboard,
            to: '/dashboard',
            devider: true,
        },
        { name: 'Users', icon: HiOutlineUsers, to: '/users', devider: false },
        { name: 'Heads', icon: RiUserStarLine, to: '/heads', devider: false },
        { name: 'Teams', icon: FiStar, to: '/trending', devider: false },
        {
            name: 'Analitics',
            icon: TbBrandGoogleAnalytics,
            to: '/analitics',
            devider: true,
        },
        { name: 'Settings', icon: FiSettings, to: '/settings', devider: false },
    ];

    return (
        <Box
            transition='3s ease'
            bg={'white'}
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
                justifyContent='space-between'
            >
                <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
                    AP Group
                </Text>
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <>
                    <NavbarItem key={link.name} icon={link.icon} link={link.to}>
                        {link.name}
                    </NavbarItem>

                    {link.devider ? (
                        <Box mx='8' my='2' h='px' bg='gray.200' />
                    ) : null}
                </>
            ))}
        </Box>
    );
};

export default SidebarContent;
