import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Info } from 'lucide-react';

export default function Mortgage({
    principal_payment,
    property_tax,
    home_insurance,
    hoa_fees,
    total_monthly_payment,
    amortization_schedule,
}) {
    const queryParams = new URLSearchParams(window.location.search);

    const { data, setData, get, reset, errors } = useForm({
        loan_amount: queryParams.get('loan_amount') || '', // Monto total del préstamo
        interest_rate: queryParams.get('interest_rate') || '', // Tasa de interés anual (%)
        loan_term: queryParams.get('loan_term') || '', // Plazo del préstamo en años
        down_payment: queryParams.get('down_payment') || '', // Pago inicial (opcional)
        property_tax: queryParams.get('property_tax') || '', // Impuesto a la propiedad (% anual, opcional)
        home_insurance: queryParams.get('home_insurance') || '', // Seguro del hogar (mensual, opcional)
        hoa_fees: queryParams.get('hoa_fees') || '', // Cuotas HOA mensuales (opcional)
    });

    const groupedByYear =
        amortization_schedule &&
        amortization_schedule.reduce((acc, item) => {
            const year = Math.ceil(item.month / 12);
            if (!acc[year]) acc[year] = [];
            acc[year].push(item);
            return acc;
        }, {});

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        get('/mortgage', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout>
                {/* Incomes and Expenses */}
                {/* <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="flex w-full justify-around gap-3 bg-white p-4 dark:bg-gray-200">
                        <button className="flex items-center justify-center gap-2">
                            <img src="/assets/images/italy.png" alt="" />
                            <span className="font-semibold">Italia</span>
                        </button>
                        <button className="flex items-center justify-center gap-2">
                            <img src="/assets/images/spain.png" alt="" />
                            <span className="font-semibold">Spain</span>
                        </button>
                        <button className="flex items-center justify-center gap-2">
                            <img src="/assets/images/usa.png" alt="" />
                            <span className="font-semibold">U.S.A</span>
                        </button>
                    </div>
                </section> */}

                <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="flex w-full flex-col items-center gap-2 bg-white p-4 dark:bg-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Calcolator Mortgage
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
                                                Monto total del préstamo
                                                hipotecario (sinentrada
                                                inicial).
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="loan_amount"
                                        placeholder="Ej: 200000"
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
                                        Down Payment
                                        <div className="group relative">
                                            <Info className="w-4 cursor-pointer" />
                                            <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                                <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                                Cantidad inicial pagada. Se
                                                resta del monto total del
                                                préstamo.
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="down_payment"
                                        placeholder="Ej: 40000"
                                        required
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
                                                Tasa de interés anual del
                                                préstamo (por ejemplo, 3.5).
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="interest_rate"
                                        step="0.01"
                                        placeholder="Ej: 3.5"
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
                                                Duración del préstamo en años
                                                (por ejemplo, 15 o 30).
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="loan_term"
                                        placeholder="Ej: 30"
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

                            <div className="flex flex-wrap justify-between gap-4 sm:flex-nowrap">
                                <label className="flex w-full flex-col gap-1">
                                    <span className="flex gap-2">
                                        Property Tax (% per year)
                                        <div className="group relative">
                                            <Info className="w-4 cursor-pointer" />
                                            <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                                <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                                Impuesto anual sobre la
                                                propiedad, como porcentaje del
                                                valor de la casa.
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="property_tax"
                                        step="0.01"
                                        placeholder="Ej: 1.2"
                                        required
                                        onChange={(e) =>
                                            setData(
                                                'property_tax',
                                                e.target.value,
                                            )
                                        }
                                        value={data.property_tax}
                                    />
                                    {errors.property_tax && (
                                        <span className="text-center text-sm font-semibold text-red_primary">
                                            {errors.property_tax}
                                        </span>
                                    )}
                                </label>

                                <label className="flex w-full flex-col gap-1">
                                    <span className="flex gap-2">
                                        Home Insurance ($ per year)
                                        <div className="group relative">
                                            <Info className="w-4 cursor-pointer" />
                                            <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                                <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                                Costo del seguro de la vivienda
                                                (anual).
                                            </span>
                                        </div>
                                    </span>
                                    <input
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                        type="number"
                                        name="home_insurance"
                                        placeholder="Ej: 1000"
                                        required
                                        onChange={(e) =>
                                            setData(
                                                'home_insurance',
                                                e.target.value,
                                            )
                                        }
                                        value={data.home_insurance}
                                    />
                                    {errors.home_insurance && (
                                        <span className="text-center text-sm font-semibold text-red_primary">
                                            {errors.home_insurance}
                                        </span>
                                    )}
                                </label>
                            </div>

                            <label className="flex flex-col gap-1">
                                <span className="relative flex flex-wrap items-center gap-2">
                                    HOA Fees ($ per month)
                                    <div className="group relative">
                                        <Info className="w-4 cursor-pointer" />
                                        <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                            <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                            Cuotas mensuales de la asociación de
                                            propietarios (si aplica).
                                        </span>
                                    </div>
                                </span>
                                <input
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                    type="number"
                                    name="hoa_fees"
                                    placeholder="Ej: 150"
                                    required
                                    onChange={(e) =>
                                        setData('hoa_fees', e.target.value)
                                    }
                                    value={data.hoa_fees}
                                />
                                {errors.hoa_fees && (
                                    <span className="text-center text-sm font-semibold text-red_primary">
                                        {errors.hoa_fees}
                                    </span>
                                )}
                            </label>

                            <button
                                className="rounded bg-gray-300 px-4 py-2 font-semibold text-quaternary hover:bg-gray-800 hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-300 dark:hover:text-quaternary"
                                type="submit"
                            >
                                Calculate Mortgage
                            </button>
                        </form>
                    </div>
                </section>

                {principal_payment &&
                    property_tax &&
                    home_insurance &&
                    hoa_fees &&
                    total_monthly_payment && (
                        <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                            <div className="flex w-full flex-col gap-4 bg-white p-4 shadow-md dark:bg-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Monthly Mortgage Summary
                                </h2>
                                <ul className="space-y-1 text-gray-700">
                                    <li>
                                        <strong>Principal & Interest:</strong> $
                                        {principal_payment}
                                    </li>
                                    <li>
                                        <strong>Property Tax:</strong> $
                                        {property_tax}
                                    </li>
                                    <li>
                                        <strong>Home Insurance:</strong> $
                                        {home_insurance}
                                    </li>
                                    <li>
                                        <strong>HOA Fees:</strong> ${hoa_fees}
                                    </li>
                                    <li className="border-b border-t border-gray-400 py-2 font-semibold">
                                        <strong>Total Monthly Payment:</strong>{' '}
                                        ${total_monthly_payment}
                                    </li>
                                </ul>
                            </div>
                        </section>
                    )}

                {amortization_schedule && (
                    <section className="relative flex flex-col justify-center gap-2 bg-white shadow-md dark:bg-gray-200 sm:flex-nowrap">
                        <h2 className="text-center text-xl font-semibold text-gray-800">
                            Amortization Schedule by Month
                        </h2>
                        <div className="flex w-full flex-wrap justify-between gap-4 p-4">
                            {Object.entries(groupedByYear).map(
                                ([year, months]) => (
                                    <div key={year}>
                                        <h2 className="text-center text-lg font-bold">
                                            Year {year}
                                        </h2>
                                        {months.map((item, index) => (
                                            <div
                                                key={item.month}
                                                className={`p-2 shadow ${
                                                    index % 2 === 0
                                                        ? 'bg-gray-300'
                                                        : 'bg-gray-200'
                                                }`}
                                            >
                                                <p className="font-semibold">
                                                    Mes:{' '}
                                                    <span className="font-normal">
                                                        {
                                                            monthNames[
                                                                (item.month -
                                                                    1) %
                                                                    12
                                                            ]
                                                        }
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
                                                        {item.principal_payment +
                                                            item.interest_payment}
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
