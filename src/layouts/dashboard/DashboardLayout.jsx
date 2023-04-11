import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SidebarContent from './partials/SidebarContent';
import MobileNav from './partials/MobileNav';

const DashboardLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH='100vh' bg={'gray.100'}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size='full'
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p='4'>
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
