import { Box, CloseButton, Flex, Text } from '@chakra-ui/react';
import {
    FiStar,
    RxDashboard,
    RiUserStarLine,
    FiSettings,
} from 'react-icons/all';

import { HiOutlineUsers } from 'react-icons/hi';

import NavbarItem from './NavbarItem';
import React from 'react';

const SidebarContent = ({ onClose, ...rest }) => {
    const LinkItems = [
        {
            name: 'Dashboard',
            icon: RxDashboard,
            to: '/dashboard',
            devider: true,
        },
        {
            name: 'Pimpinan',
            icon: RiUserStarLine,
            to: '/pimpinan',
            devider: false,
        },
        {
            name: 'Anggota',
            icon: HiOutlineUsers,
            to: '/anggota',
            devider: false,
        },
        { name: 'Tim', icon: FiStar, to: '/tim', devider: true },
        // {
        //     name: 'Analitics',
        //     icon: TbBrandGoogleAnalytics,
        //     to: '/analitics',
        //     devider: true,
        // },
        {
            name: 'Pengaturan',
            icon: FiSettings,
            to: '/pengaturan',
            devider: false,
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

            {LinkItems.map((link, index) => (
                <React.Fragment key={index}>
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
                </React.Fragment>
            ))}
        </Box>
    );
};

export default SidebarContent;
