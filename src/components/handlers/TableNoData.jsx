import { Td } from '@chakra-ui/react';

const TableNoData = (props) => {
    return (
        <Td colSpan={6} textAlign='center' py={4} {...props}>
            Data tidak ditemukan
        </Td>
    );
};

export default TableNoData;
