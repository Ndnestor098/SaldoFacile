import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Info } from 'lucide-react';

export default function Credit({
    loan_amount,
    down_payment,
    interest_rate,
    loan_term,
    monthly_payment,
    total_payment,
    schedule,
}) {
    const queryParams = new URLSearchParams(window.location.search);

    const { data, setData, get, reset, errors } = useForm({
        loan_amount: queryParams.get('loan_amount') || '', // Monto del préstamo
        interest_rate: queryParams.get('interest_rate') || '', // Tasa de interés anual
        loan_term: queryParams.get('loan_term') || '', // Plazo del préstamo en años
        down_payment: queryParams.get('down_payment') || '', // Pago inicial (opcional)
    });

    const groupedByYear = schedule.reduce((acc, item) => {
        const year = item.year;
        if (!acc[year]) acc[year] = [];
        acc[year].push(item);
        return acc;
    }, {});

    const handleSubmit = (e) => {
        e.preventDefault();

        get(route('tools.credit'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Credit" />
            <AuthenticatedLayout>
                <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="flex w-full flex-col items-center gap-2 bg-white p-4 dark:bg-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Credit Calculator
                        </h2>
                        <form
                            className="flex w-full max-w-[600px] flex-col gap-3"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-wrap justify-between gap-4 sm:flex-nowrap">
                                <label className="flex w-full flex-col gap-1">
                                    <span className="relative flex flex-wrap items-center gap-2">
                                        Loan Amount
                                        <div className="group relative">
                                            <Info className="w-4 cursor-pointer" />
                                            <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                                <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                                Total loan amount before
                                                applying the down payment.
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="loan_amount"
                                        placeholder="e.g. 10000"
                                        required
                                        onChange={(e) =>
                                            setData(
                                                'loan_amount',
                                                e.target.value,
                                            )
                                        }
                                        value={data.loan_amount}
                                    />
                                    {errors.loan_amount && (
                                        <span className="text-center text-sm font-semibold text-red_primary">
                                            {errors.loan_amount}
                                        </span>
                                    )}
                                </label>

                                <label className="flex w-full flex-col gap-1">
                                    <span className="relative flex flex-wrap items-center gap-2">
                                        Down Payment (optional)
                                        <div className="group relative">
                                            <Info className="w-4 cursor-pointer" />
                                            <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                                <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                                Optional upfront payment. If
                                                entered, it will reduce the
                                                total loan amount.
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="down_payment"
                                        placeholder="e.g. 4000"
                                        onChange={(e) =>
                                            setData(
                                                'down_payment',
                                                e.target.value,
                                            )
                                        }
                                        value={data.down_payment}
                                    />
                                    {errors.down_payment && (
                                        <span className="text-center text-sm font-semibold text-red_primary">
                                            {errors.down_payment}
                                        </span>
                                    )}
                                </label>
                            </div>

                            <div className="flex flex-wrap justify-between gap-4 sm:flex-nowrap">
                                <label className="flex w-full flex-col gap-1">
                                    <span className="relative flex flex-wrap items-center gap-2">
                                        Interest Rate (%)
                                        <div className="group relative">
                                            <Info className="w-4 cursor-pointer" />
                                            <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                                <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                                Annual interest rate as a
                                                percentage (e.g., 3.5).
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="interest_rate"
                                        step="0.01"
                                        placeholder="e.g. 3.5"
                                        required
                                        onChange={(e) =>
                                            setData(
                                                'interest_rate',
                                                e.target.value,
                                            )
                                        }
                                        value={data.interest_rate}
                                    />
                                    {errors.interest_rate && (
                                        <span className="text-center text-sm font-semibold text-red_primary">
                                            {errors.interest_rate}
                                        </span>
                                    )}
                                </label>

                                <label className="flex w-full flex-col gap-1">
                                    <span className="relative flex flex-wrap items-center gap-2">
                                        Loan Term (Years)
                                        <div className="group relative">
                                            <Info className="w-4 cursor-pointer" />
                                            <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                                <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                                Loan duration in years (e.g., 1,
                                                5, 10).
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="loan_term"
                                        placeholder="e.g. 10"
                                        required
                                        onChange={(e) =>
                                            setData('loan_term', e.target.value)
                                        }
                                        value={data.loan_term}
                                    />
                                    {errors.loan_term && (
                                        <span className="text-center text-sm font-semibold text-red_primary">
                                            {errors.loan_term}
                                        </span>
                                    )}
                                </label>
                            </div>

                            <button
                                className="rounded bg-gray-300 px-4 py-2 font-semibold text-quaternary hover:bg-gray-800 hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-300 dark:hover:text-quaternary"
                                type="submit"
                            >
                                Calculate Loan
                            </button>
                        </form>
                    </div>
                </section>

                {monthly_payment && total_payment && (
                    <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                        <div className="flex w-full flex-col gap-4 bg-white p-4 shadow-md dark:bg-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Credit Summary
                            </h2>
                            <ul className="space-y-1 text-gray-700">
                                <li>
                                    <strong>Loan Amount:</strong> ${loan_amount}
                                </li>
                                <li>
                                    <strong>Down Payment:</strong> $
                                    {down_payment}
                                </li>
                                <li>
                                    <strong>Annual Interest Rate:</strong>{' '}
                                    {interest_rate}%
                                </li>
                                <li>
                                    <strong>Loan Term:</strong> {loan_term}{' '}
                                    years
                                </li>
                                <li>
                                    <strong>
                                        Total Paid Over {loan_term} Years:
                                    </strong>{' '}
                                    ${total_payment}
                                </li>
                                <li className="border-b border-t border-gray-400 py-2 font-semibold">
                                    <strong>Monthly Payment:</strong> $
                                    {monthly_payment}
                                </li>
                            </ul>
                        </div>
                    </section>
                )}

                {schedule && (
                    <section className="relative flex flex-col justify-center gap-2 bg-white shadow-md dark:bg-gray-200 sm:flex-nowrap">
                        <h2 className="text-center text-xl font-semibold text-gray-800">
                            Amortization Schedule by Month
                        </h2>
                        <div className="flex w-full flex-wrap justify-around gap-4 p-4">
                            {Object.entries(groupedByYear).map(
                                ([year, months]) => (
                                    <div key={year}>
                                        <h2 className="text-center text-lg font-bold">
                                            Year {year}
                                        </h2>
                                        {months.map((item, index) => (
                                            <div
                                                key={item.month + index}
                                                className={`p-2 shadow ${
                                                    index % 2 === 0
                                                        ? 'bg-gray-300'
                                                        : 'bg-gray-200'
                                                }`}
                                            >
                                                <p className="font-semibold">
                                                    Mes:{' '}
                                                    <span className="font-normal">
                                                        {item.month}
                                                    </span>
                                                </p>
                                                <p className="font-semibold">
                                                    Interest Payment: $
                                                    <span className="font-normal">
                                                        {item.interest_payment}
                                                    </span>
                                                </p>
                                                <p className="font-semibold">
                                                    Principal Payment: $
                                                    <span className="font-normal">
                                                        {item.principal_payment}
                                                    </span>
                                                </p>
                                                <p className="font-semibold">
                                                    Total: $
                                                    <span className="font-normal">
                                                        {item.total}
                                                    </span>
                                                </p>
                                                <p className="font-semibold">
                                                    Remaining Balance: $
                                                    <span className="font-normal">
                                                        {item.remaining_balance}
                                                    </span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ),
                            )}
                        </div>
                    </section>
                )}
            </AuthenticatedLayout>
        </>
    );
}
