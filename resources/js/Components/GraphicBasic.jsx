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

function getLastSixMonthsSummary(data) {
    const result = [];
    const today = new Date();

    // Iterar sobre los últimos 6 meses
    for (let i = 0; i < 6; i++) {
        const monthStart = new Date(today);
        monthStart.setMonth(today.getMonth() - i);
        monthStart.setDate(1); // El primer día del mes

        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthStart.getMonth() + 1);
        monthEnd.setDate(0); // El último día del mes

        const amount = data
            .filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate >= monthStart && itemDate <= monthEnd;
            })
            .reduce((sum, item) => sum + Number(item.amount), 0);

        // Formato: "Mar 2025"
        const monthName = monthStart.toLocaleString('default', {
            month: 'short',
        });
        const year = monthStart.getFullYear();
        const label = `${monthName} ${year}`;

        result.push({ name: label, amount });
    }

    return result;
}

export default function GraphicBasic({ data, type }) {
    if (!data) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <span>No data available</span>
            </div>
        );
    }

    const arrayGraphic = getLastSixMonthsSummary(data);
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
