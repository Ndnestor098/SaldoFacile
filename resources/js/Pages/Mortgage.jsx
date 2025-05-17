import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Info } from "lucide-react";

export default function Mortgage() {
    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout>
                {/* Incomes and Expenses */}
                <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
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
                </section>

                <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="flex w-full justify-center bg-white p-4 dark:bg-gray-200">
                        <form
                            action=""
                            className="flex w-full max-w-[600px] flex-col gap-3"
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
                                    />
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
                                    />
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
                                    />
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
                                    />
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
                                    />
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
                                    />
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
                                />
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
            </AuthenticatedLayout>
        </>
    );
}
