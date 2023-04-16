import { Flex, Icon, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavbarItem = ({ icon, children, link, onClick, ...rest }) => {
    return (
        <ChakraLink
            as={Link}
            to={link}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            onClick={onClick}
        >
            <Flex
                align='center'
                p='4'
                mx='4'
                borderRadius='lg'
                role='group'
                cursor='pointer'
                _hover={{
                    bg: 'blue.400',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr='4'
                        fontSize='16'
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </ChakraLink>
    );
};

export default NavbarItem;
