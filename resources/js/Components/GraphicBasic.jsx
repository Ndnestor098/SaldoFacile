import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function GraphicBasic({ data, type }) {
    const arrayGraphic = [
        {
            name: 'January',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '01'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'February',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '02'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'March',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '03'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'April',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '04'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'May',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '05'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'June',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '05'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'July',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '07'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'August',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '08'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'September',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '09'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'October',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '10'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'November',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '11'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
        {
            name: 'Dicember',
            amount: data
                .map((item) => {
                    return item.date.split('-')[1] === '12'
                        ? Number(item.amount)
                        : 0;
                })
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                ),
        },
    ];
    return (
        <div className="h-[300px] w-full max-w-6xl">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={arrayGraphic}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="amount"
                        fill={type == 'incomes' ? '#9DC08B' : '#BF3131'}
                        stroke="#4d4d4d"
                        activeBar={
                            <Rectangle
                                fill={type == 'incomes' ? '#BBD8AC' : '#FF8383'}
                                stroke="#4d4d4d"
                            />
                        }
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
