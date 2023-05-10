import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
import { dateParser } from '@/helpers/date-helper';
import { Badge } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

export default function DataNoVoteSection() {
    const { userNotVoted } = useSelector((state) => state.vote);

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
        return userNotVoted.map((user) => {
            return {
                id: user.id,
                name: user.full_name,
                status: (
                    <Badge
                        px={1}
                        py={1}
                        bg={user.status ? 'green.400' : 'red'}
                        textColor={'white'}
                        rounded={'md'}
                        fontSize={'x-small'}
                    >
                        {user.status ? (
                            <BsCheckLg color={'white'} size={18} />
                        ) : (
                            <IoMdClose color={'white'} size={18} />
                        )}
                    </Badge>
                ),
                date: dateParser(user.today_vote_date),
            };
        });
    }, [userNotVoted]);

    return (
        <Wrapper
            title='List data tidak vote'
            description='Keterangan list anggota yang tidak melakukan vote.'
        >
            <TableBasic columns={columns} data={data} />
        </Wrapper>
    );
}
