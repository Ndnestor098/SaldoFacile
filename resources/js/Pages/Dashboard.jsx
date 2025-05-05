import AddingExpense from '@/Components/AddingExpense';
import AddingIncome from '@/Components/AddingIncome';
import AddingRecurrentExpense from '@/Components/AddingRecurrentExpense';
import AddingRecurrentIncome from '@/Components/AddingRecurrentIncome';
import GraphicBasic from '@/Components/GraphicBasic';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({
    categories,
    incomes,
    expenses,
    recurrentExpenses,
    recurrentIncomes,
}) {
    const summary = usePage().props.auth.user.summary;

    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout>
                {/* Balance */}
                <section className="relative flex flex-wrap items-center justify-around gap-2 sm:flex-nowrap">
                    <div className="flex w-full flex-wrap justify-center gap-4 sm:flex-nowrap">
                        <p className="w-full max-w-[230px] bg-white p-4 text-center dark:bg-gray-200">
                            Total Incomes:
                            <span className="font-bold text-green-700">
                                {' $' +
                                    summary.total_incomes.toLocaleString(
                                        'en-US',
                                        {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        },
                                    )}
                            </span>
                        </p>
                        <p className="w-full max-w-[230px] bg-white p-4 text-center dark:bg-gray-200">
                            30-Day Balance:
                            <span
                                className={`font-bold ${
                                    summary.net_balance === 0
                                        ? 'text-black'
                                        : summary.net_balance > 0
                                          ? 'text-green-700'
                                          : 'text-red-700'
                                }`}
                            >
                                {' $' +
                                    summary.net_balance.toLocaleString(
                                        'en-US',
                                        {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        },
                                    )}
                            </span>
                        </p>
                        <p className="w-full max-w-[230px] bg-white p-4 text-center dark:bg-gray-200">
                            Total Expenses:
                            <span className="font-bold text-red-700">
                                {' $' +
                                    summary.total_expenses.toLocaleString(
                                        'en-US',
                                        {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        },
                                    )}
                            </span>
                        </p>
                    </div>
                </section>

                {/* Incomes and Expenses */}
                <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="w-full bg-white p-4 dark:bg-gray-200">
                        <AddingIncome categories={categories} />
                    </div>
                    <div className="w-full bg-white p-4 dark:bg-gray-200">
                        <AddingExpense categories={categories} />
                    </div>
                </section>
                <section className="relative flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="w-full overflow-x-auto bg-white p-4 dark:bg-gray-200">
                        <GraphicBasic data={incomes} type="incomes" />
                    </div>
                    <div className="w-full overflow-x-auto bg-white p-4 dark:bg-gray-200">
                        <GraphicBasic data={expenses} type="expenses" />
                    </div>
                </section>

                {/* Recurring Incomes and Expenses */}
                <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="w-full bg-white p-4 dark:bg-gray-200">
                        <AddingRecurrentIncome categories={categories} />
                    </div>
                    <div className="w-full bg-white p-4 dark:bg-gray-200">
                        <AddingRecurrentExpense categories={categories} />
                    </div>
                </section>
                <section className="relative flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="w-full overflow-x-auto bg-white p-4 dark:bg-gray-200">
                        <GraphicBasic data={recurrentIncomes} type="incomes" />
                    </div>
                    <div className="w-full overflow-x-auto bg-white p-4 dark:bg-gray-200">
                        <GraphicBasic
                            data={recurrentExpenses}
                            type="expenses"
                        />
                    </div>
                </section>
            </AuthenticatedLayout>
        </>
    );
}
