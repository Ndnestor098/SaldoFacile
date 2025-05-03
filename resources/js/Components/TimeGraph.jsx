import { useState } from 'react';
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

function getDataHoursSummary(data) {
    const ranges = {
        morning: ['06:00:00', '12:00:00'], // Mañana
        midday: ['12:00:00', '14:00:00'], // Mediodía
        afternoon: ['14:00:00', '18:00:00'], // Tarde
        evening: ['18:00:00', '21:00:00'], // Atardecer
        night: ['21:00:00', '24:00:00'], // Noche
    };

    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    const result = [];

    for (const [label, [start, end]] of Object.entries(ranges)) {
        const amount = data
            .filter((item) => {
                const [datePart, timePart] = item.date.split(' ');
                return (
                    datePart === today && timePart >= start && timePart < end
                );
            })
            .reduce((sum, item) => sum + Number(item.amount), 0);

        result.push({
            name: ranges[label][0] + ' - ' + ranges[label][1],
            amount,
        });
    }

    return result;
}

function getLast7DaysData(data) {
    const today = new Date();
    const result = {};

    // Inicializa los últimos 7 días con monto 0
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        result[key] = 0;
    }

    // Suma los montos por fecha si están en los últimos 7 días
    data.forEach((item) => {
        const [datePart] = item.date.split(' ');
        if (result.hasOwnProperty(datePart)) {
            result[datePart] += Number(item.amount);
        }
    });

    // Devuelve el resultado como array [{ name, amount }]
    return Object.entries(result).map(([date, amount]) => ({
        name: date,
        amount,
    }));
}

function getPreviousMonthWeeksSummary(data) {
    const result = [];

    const today = new Date();

    // Primer día del mes anterior
    const firstDayPrevMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
    );

    const month = firstDayPrevMonth.toLocaleString('default', {
        month: 'short',
    });

    for (let i = 0; i < 4; i++) {
        const weekStart = new Date(firstDayPrevMonth);
        weekStart.setDate(1 + i * 7);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        // Para filtrar
        const endInclusive = new Date(weekEnd);
        endInclusive.setDate(endInclusive.getDate() + 1);

        const amount = data
            .filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate >= weekStart && itemDate < endInclusive;
            })
            .reduce((sum, item) => sum + Number(item.amount), 0);

        // Formato: "01–07 Mar"
        const rangeLabel = `${String(weekStart.getDate()).padStart(2, '0')}–${String(weekEnd.getDate()).padStart(2, '0')} ${month}`;

        result.push({ name: rangeLabel, amount });
    }

    return result;
}

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

function getLastYearSummary(data) {
    const result = [];
    const today = new Date();

    // Fecha de inicio: el primer día de enero del año pasado
    const startOfYear = new Date(today.getFullYear() - 1, 0, 1);

    // Iterar sobre los 12 meses del año pasado
    for (let i = 0; i < 12; i++) {
        const monthStart = new Date(startOfYear);
        monthStart.setMonth(startOfYear.getMonth() + i);
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

function getLastThreeYearsSummary(data) {
    const result = [];
    const today = new Date();

    // Iterar sobre los 3 últimos años
    for (let i = 0; i < 3; i++) {
        const yearStart = today.getFullYear() - i;

        // Primeros 6 meses
        const firstHalfStart = new Date(yearStart, 0, 1); // 1 enero
        const firstHalfEnd = new Date(yearStart, 5, 30); // 30 junio

        const firstHalfAmount = data
            .filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate >= firstHalfStart && itemDate <= firstHalfEnd;
            })
            .reduce((sum, item) => sum + Number(item.amount), 0);

        result.push({
            name: `First 6 months ${yearStart}`,
            amount: firstHalfAmount,
        });

        // Últimos 6 meses
        const secondHalfStart = new Date(yearStart, 6, 1); // 1 julio
        const secondHalfEnd = new Date(yearStart, 11, 31); // 31 diciembre

        const secondHalfAmount = data
            .filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate >= secondHalfStart && itemDate <= secondHalfEnd;
            })
            .reduce((sum, item) => sum + Number(item.amount), 0);

        result.push({
            name: `Last 6 months ${yearStart}`,
            amount: secondHalfAmount,
        });
    }

    return result.reverse();
}

export default function TimeGraph({ dataRecurrent, data, active, type }) {
    const [selection, setSelection] = useState(0);

    const dataToday = getDataHoursSummary(active ? data : dataRecurrent);

    const dataWeek = getLast7DaysData(active ? data : dataRecurrent);

    const dataPreviousMonth = getPreviousMonthWeeksSummary(
        active ? data : dataRecurrent,
    );

    const dataPreviousSixMonths = getLastSixMonthsSummary(
        active ? data : dataRecurrent,
    );

    const dataPreviousYear = getLastYearSummary(active ? data : dataRecurrent);

    const dataPrevious3Years = getLastThreeYearsSummary(
        active ? data : dataRecurrent,
    );

    return (
        <>
            <h2 className="mb-3 mt-1 text-center text-2xl font-semibold">
                Income Over Time Chart
            </h2>
            <div
                role="group"
                aria-label="Select time range"
                className="flex flex-wrap items-center justify-center gap-2 md:flex-nowrap"
            >
                <button
                    onClick={() => setSelection(0)}
                    className={`rounded-lg px-3 py-2 duration-300 ${
                        selection === 0
                            ? 'cursor-no-drop bg-gray-200 text-gray-400 dark:bg-gray-400 dark:text-gray-600'
                            : 'bg-gray-300 text-quaternary hover:scale-105 dark:bg-gray-800 dark:text-white'
                    }`}
                >
                    1 day
                </button>
                <button
                    onClick={() => setSelection(1)}
                    className={`rounded-lg px-3 py-2 duration-300 ${
                        selection === 1
                            ? 'cursor-no-drop bg-gray-200 text-gray-400 dark:bg-gray-400 dark:text-gray-600'
                            : 'bg-gray-300 text-quaternary hover:scale-105 dark:bg-gray-800 dark:text-white'
                    }`}
                >
                    1 week
                </button>
                <button
                    onClick={() => setSelection(2)}
                    className={`rounded-lg px-3 py-2 duration-300 ${
                        selection === 2
                            ? 'cursor-no-drop bg-gray-200 text-gray-400 dark:bg-gray-400 dark:text-gray-600'
                            : 'bg-gray-300 text-quaternary hover:scale-105 dark:bg-gray-800 dark:text-white'
                    }`}
                >
                    1 month
                </button>
                <button
                    onClick={() => setSelection(3)}
                    className={`rounded-lg px-3 py-2 duration-300 ${
                        selection === 3
                            ? 'cursor-no-drop bg-gray-200 text-gray-400 dark:bg-gray-400 dark:text-gray-600'
                            : 'bg-gray-300 text-quaternary hover:scale-105 dark:bg-gray-800 dark:text-white'
                    }`}
                >
                    6 months
                </button>
                <button
                    onClick={() => setSelection(4)}
                    className={`rounded-lg px-3 py-2 duration-300 ${
                        selection === 4
                            ? 'cursor-no-drop bg-gray-200 text-gray-400 dark:bg-gray-400 dark:text-gray-600'
                            : 'bg-gray-300 text-quaternary hover:scale-105 dark:bg-gray-800 dark:text-white'
                    }`}
                >
                    1 year
                </button>
                <button
                    onClick={() => setSelection(5)}
                    className={`rounded-lg px-3 py-2 duration-300 ${
                        selection === 5
                            ? 'cursor-no-drop bg-gray-200 text-gray-400 dark:bg-gray-400 dark:text-gray-600'
                            : 'bg-gray-300 text-quaternary hover:scale-105 dark:bg-gray-800 dark:text-white'
                    }`}
                >
                    3 years
                </button>
            </div>
            <div className="mt-4" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={
                            selection === 0
                                ? dataToday
                                : selection === 1
                                  ? dataWeek
                                  : selection === 2
                                    ? dataPreviousMonth
                                    : selection === 3
                                      ? dataPreviousSixMonths
                                      : selection === 4
                                        ? dataPreviousYear
                                        : dataPrevious3Years
                        }
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
                                    fill={
                                        type == 'incomes'
                                            ? '#BBD8AC'
                                            : '#FF8383'
                                    }
                                    stroke="#4d4d4d"
                                />
                            }
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
