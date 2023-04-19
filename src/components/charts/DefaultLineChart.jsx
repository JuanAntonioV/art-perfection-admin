import {
    CartesianGrid,
    Line,
    XAxis,
    YAxis,
    LineChart as LineRechart,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const DefaultLineChart = ({ data }) => {
    return (
        <ResponsiveContainer width='100%' height={400}>
            <LineRechart
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: -10 }}
            >
                <Line type='monotone' dataKey='kehadiran' stroke='blue' />
                <Line type='monotone' dataKey='kedisiplinan' stroke='red' />
                <Line type='monotone' dataKey='kemandirian' stroke='purple' />
                <Line type='monotone' dataKey='saran' stroke='green' />
                <Line type='monotone' dataKey='ketepatan' stroke='black' />
                <Line type='monotone' dataKey='progress' stroke='cyan' />
                <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineRechart>
        </ResponsiveContainer>
    );
};

export default DefaultLineChart;
