import {
    CartesianGrid,
    Line,
    XAxis,
    YAxis,
    LineChart as LineRechart,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ComposedChart,
    Area,
} from 'recharts';

const DefaultLineChart = ({ data }) => {
    const colors = [
        // make randomg colors that not the same with indicator colors and eye catching
        '#4A86E8',
        '#9900FF',
        '#0000FF',
        '#999999',
        '#46BDC6',
        '#FF00FF',
    ];

    const indicatorColors = [
        '#FF000033',
        '#FFFF0033',
        '#FF990033',
        '#00FF0033',
    ];

    return (
        <ResponsiveContainer width='100%' height={400}>
            <ComposedChart
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: -10 }}
            >
                {data[0]?.criteria?.map((entry, index) => (
                    <Line
                        key={entry.criteria}
                        type='monotone'
                        dataKey={`criteria[${index}].total_score`}
                        name={entry.criteria}
                        stroke={colors[index]}
                        fill={colors[index]}
                        dot={true}
                        strokeWidth={3}
                    />
                ))}

                {/* Indikator */}
                {data[0]?.indicators?.map((entry, index) => (
                    <Line
                        key={entry.name}
                        type='monotone'
                        dataKey={`indicators[${index}].value`}
                        name={entry.name}
                        stroke={indicatorColors[index]}
                        dot={false}
                        strokeWidth={3}
                    />
                ))}
                <CartesianGrid stroke='#ccc' strokeDasharray='6 6' />
                <XAxis dataKey='vote_date' allowDuplicatedCategory={false} />
                <YAxis />
                <Tooltip />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default DefaultLineChart;
