import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
import { dateParser } from '@/helpers/date-helper';
import { Badge } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

export default function DataVoteSection() {
    const [employeVote, setEmployeVote] = useState([
        {
            id: 1,
            full_name: 'Rizky',
            status: true,
            date: '2023-05-02',
        },
        {
            id: 2,
            full_name: 'Rizky',
            status: true,
            date: '2023-05-02',
        },
        {
            id: 3,
            full_name: 'Rizky',
            status: true,
            date: '2023-05-02',
        },
        {
            id: 4,
            full_name: 'Rizky',
            status: true,
            date: '2023-05-02',
        },
        {
            id: 5,
            full_name: 'Rizky',
            status: true,
            date: '2023-05-02',
        },
    ]);

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Nama lengkap',
                accessor: 'name',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Tanggal',
                accessor: 'date',
            },
        ],
        []
    );

    const data = useMemo(() => {
        return employeVote.map((employe) => {
            return {
                id: employe.id,
                name: employe.full_name,
                status: (
                    <Badge
                        px={1}
                        py={1}
                        bg={employe.status ? 'green.400' : 'red'}
                        textColor={'white'}
                        rounded={'md'}
                        fontSize={'x-small'}
                    >
                        {employe.status ? (
                            <BsCheckLg color={'white'} size={18} />
                        ) : (
                            <IoMdClose color={'white'} size={18} />
                        )}
                    </Badge>
                ),
                date: dateParser(employe.date),
            };
        });
    }, [employeVote]);

    return (
        <Wrapper
            title='List data vote'
            description='Keterangan list anggota yang melakukan vote.'
        >
            <TableBasic columns={columns} data={data} />
        </Wrapper>
    );
}
