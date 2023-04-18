import { Td, Tr } from '@chakra-ui/react';

const TableNoData = () => {
    return (
        <Tr>
            <Td colSpan={6} textAlign='center' py={4}>
                Data tidak ditemukan
            </Td>
        </Tr>
    );
};

export default TableNoData;
