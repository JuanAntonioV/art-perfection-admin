import TableBasic from '@/components/tables/TableBasic';
import Wrapper from '@/components/wrappers/Wrapper';
import { dateParser } from '@/helpers/date-helper';
import { Skeleton } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const HolidaySection = () => {
    const holidays = useSelector((state) => state.holiday.holidays);

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Judul',
                accessor: 'title',
            },
            // {
            //     Header: 'Keterangan',
            //     accessor: 'description',
            // },
            {
                Header: 'Tanggal Libur',
                accessor: 'date',
            },
        ],
        []
    );

    const data = useMemo(() => {
        let count = 1;
        return holidays.map((holiday) => {
            return {
                count: count++,
                title: holiday.title,
                // description: holiday.description,
                date: dateParser(holiday.date),
            };
        });
    }, [holidays]);

    return (
        <Wrapper
            title={'Hari Libur'}
            description={
                'Menu ini berisi informasi mengenai hari libur yang ada pada votes system.'
            }
        >
            <Skeleton isLoaded={holidays}>
                <TableBasic columns={columns} data={data} />
            </Skeleton>
        </Wrapper>
    );
};

export default HolidaySection;
