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
    return (
        <ResponsiveContainer width='100%' height={400}>
            <ComposedChart
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: -10 }}
            >
                <Area
                    type='monotone'
                    dataKey='kehadiran'
                    stroke='#4A86E8'
                    strokeWidth={3}
                />
                <Area
                    type='monotone'
                    dataKey='kedisiplinan'
                    stroke='#9900FF'
                    strokeWidth={3}
                />
                <Area
                    type='monotone'
                    dataKey='kemandirian'
                    stroke='#0000FF'
                    strokeWidth={3}
                />
                <Area
                    type='monotone'
                    dataKey='saran'
                    stroke='#999999'
                    strokeWidth={3}
                />
                <Area
                    type='monotone'
                    dataKey='ketepatan'
                    stroke='#FF00FF'
                    strokeWidth={3}
                />
                <Area
                    type='monotone'
                    dataKey='progress'
                    stroke='#46BDC6'
                    strokeWidth={3}
                />
                {/* Indikator */}
                <Line
                    type='monotone'
                    dataKey='iSangatTidakSesuai'
                    stroke='#FF0000'
                    strokeDasharray='5 5'
                    dot={false}
                />
                <Line
                    type='monotone'
                    dataKey='iTidakSesuai'
                    stroke='#FFFF00'
                    strokeDasharray='5 5'
                    dot={false}
                />
                <Line
                    type='monotone'
                    dataKey='iSesuai'
                    stroke='#FF9900'
                    strokeDasharray='5 5'
                    dot={false}
                />
                <Line
                    type='monotone'
                    dataKey='iSangatSesuai'
                    stroke='#00FF00'
                    strokeDasharray='5 5'
                    dot={false}
                />
                <CartesianGrid stroke='#ccc' strokeDasharray='6 6' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default DefaultLineChart;
