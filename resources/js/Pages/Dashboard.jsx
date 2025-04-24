import AddingExpense from '@/Components/AddingExpense';
import AddingIncome from '@/Components/AddingIncome';
import GraphicBasic from '@/Components/GraphicBasic';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ categories, incomes, expenses }) {
    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout>
                <section className="relative flex flex-wrap items-center justify-around gap-2 sm:flex-nowrap">
                    <div className="w-full bg-white p-4 dark:bg-gray-200">
                        <AddingIncome categories={categories} />
                    </div>
                    <div className="w-full bg-white p-4 dark:bg-gray-200">
                        <AddingExpense categories={categories} />
                    </div>
                </section>
                <section className="mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="w-full overflow-x-auto bg-white p-4 dark:bg-gray-200">
                        <GraphicBasic data={incomes} type="incomes" />
                    </div>
                    <div className="w-full overflow-x-auto bg-white p-4 dark:bg-gray-200">
                        <GraphicBasic data={expenses} type="expenses" />
                    </div>
                </section>
            </AuthenticatedLayout>
        </>
    );
}
