import HistoryButton from '@/Components/HistoryButton';
import HistoryFilter from '@/Components/HistoryFilter';
import Pagination from '@/Components/Pagination';
import PrincipalTable from '@/Components/PrincipalTable';
import TimeGraph from '@/Components/TimeGraph';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

export default function History({
    expenses,
    categories,
    recurrentExpenses,
    expensesAll,
    recurrentExpensesAll,
    expensesAmount,
    recurrentAmount,
}) {
    const queryParams = new URLSearchParams(window.location.search);
    const [active, setActive] = useState(() => {
        const param = queryParams.get('active');
        if (param === 'false') return false;
        return true;
    });

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            swal({
                title: flash.success.title,
                text: flash.success.text,
                icon: flash.success.icon,
            });
        }
    }, [flash.success]);

    return (
        <>
            <Head title="History - Expenses" />
            <AuthenticatedLayout>
                <div>
                    {/* Filter */}
                    <section className="mt-2 flex flex-wrap justify-between gap-4 bg-white p-4 dark:bg-gray-200 md:flex-nowrap md:gap-0">
                        <HistoryFilter
                            categories={categories}
                            type="expenses"
                            active={active}
                        />
                    </section>

                    {/* Button */}
                    <HistoryButton
                        active={active}
                        setActive={setActive}
                        type="expenses"
                    />

                    {/* Totals */}
                    <section className="relative mt-2 flex flex-wrap justify-center gap-3 bg-white p-2 dark:bg-gray-200 sm:flex-nowrap">
                        <div className="flex items-center justify-center gap-2">
                            <h3 className="font-bold">Total Incomes:</h3>
                            <span>
                                $
                                {expensesAmount.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <h3 className="font-bold">
                                Total Active Recurrent Incomes:
                            </h3>
                            <span>
                                $
                                {recurrentAmount.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <h3 className="font-bold">Total:</h3>
                            <span>
                                $
                                {(
                                    expensesAmount + recurrentAmount
                                ).toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>
                    </section>

                    {/* Table Expenses */}
                    <section
                        className={
                            active
                                ? `relative mt-2 bg-white p-2 dark:bg-gray-200`
                                : `hidden`
                        }
                    >
                        <PrincipalTable data={expenses.data} type="expenses" />
                    </section>
                    {/* Paginate */}
                    <section
                        className={
                            active
                                ? `relative mt-2 bg-white p-2 dark:bg-gray-200`
                                : `hidden`
                        }
                    >
                        <Pagination links={expenses.links} active={active} />
                    </section>

                    {/* Table Recurrent Expenses */}
                    <section
                        className={
                            !active
                                ? `relative mt-2 bg-white p-2 dark:bg-gray-200`
                                : `hidden`
                        }
                    >
                        <PrincipalTable
                            data={recurrentExpenses.data}
                            type="expenses.recurring"
                        />
                    </section>
                    {/* Paginate */}
                    <section
                        className={
                            !active
                                ? `relative mt-2 bg-white p-2 dark:bg-gray-200`
                                : `hidden`
                        }
                    >
                        <Pagination
                            links={recurrentExpenses.links}
                            active={active}
                        />
                    </section>

                    {/* Graphics */}
                    <section
                        className="relative mt-2 bg-white p-2 dark:bg-gray-200"
                        aria-labelledby="time-range-label"
                    >
                        <TimeGraph
                            dataRecurrent={recurrentExpensesAll}
                            data={expensesAll}
                            active={active}
                            type={'expenses'}
                        />
                    </section>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
