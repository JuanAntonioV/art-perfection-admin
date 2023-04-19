import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { IoSearch } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import {
    useAsyncDebounce,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table';

const TableBasic = ({ columns, data, addAction }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        pageCount,
        setPageSize,
        canPreviousPage,
        canNextPage,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { pageIndex, pageSize, globalFilter } = state;

    return (
        <TableContainer mt={4}>
            <Flex align={'center'} justify={'end'} mb={4} gap={2}>
                <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                />

                {addAction ? (
                    <Button
                        leftIcon={<MdAdd size={16} />}
                        colorScheme='teal'
                        variant='solid'
                        size={'sm'}
                        onClick={addAction}
                    >
                        New
                    </Button>
                ) : null}
            </Flex>
            <Table
                variant='striped'
                colorScheme='gray'
                size={'sm'}
                {...getTableProps()}
            >
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);

                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <Box mt={6} display='flex' justifyContent='space-between'>
                <Flex align={'center'}>
                    <Stack mx={2}>
                        <Select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                            w={'fit-content'}
                            size={'sm'}
                            rounded={'md'}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </Select>
                    </Stack>
                    <Text as='span' fontSize={'sm'}>
                        entries
                    </Text>
                </Flex>
                <Flex align={'center'}>
                    <Flex align={'center'}>
                        <Text as='span' fontSize={'sm'}>
                            Page
                        </Text>
                        <Text as='span' mx={2} fontSize={'sm'}>
                            <strong>
                                {pageIndex + 1} of {pageCount}
                            </strong>
                        </Text>
                        <Text as='span'>|</Text>
                    </Flex>
                    <ButtonGroup mx={2}>
                        <IconButton
                            variant={'outline'}
                            size={'sm'}
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            _hover={{
                                bg: 'blue.400',
                                textColor: 'white',
                            }}
                            icon={<HiChevronLeft size={20} />}
                        />

                        <IconButton
                            variant={'outline'}
                            size={'sm'}
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            _hover={{
                                bg: 'blue.400',
                                textColor: 'white',
                            }}
                            icon={<HiChevronRight size={20} />}
                        />
                    </ButtonGroup>
                </Flex>
            </Box>
        </TableContainer>
    );
};

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <Box w='fit-content'>
            <InputGroup size={'sm'}>
                <InputLeftElement
                    pointerEvents='none'
                    children={<IoSearch size={18} />}
                />
                <Input
                    placeholder='Search'
                    rounded={'md'}
                    w={'fit-content'}
                    mr={2}
                    value={filter || ''}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </InputGroup>
        </Box>
    );
};

export default TableBasic;
