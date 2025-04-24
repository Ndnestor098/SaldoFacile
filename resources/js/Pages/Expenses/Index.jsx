import AddingExpense from '@/Components/AddingExpense';
import GraphicBasic from '@/Components/GraphicBasic';
import PrincipalTable from '@/Components/PrincipalTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ categories, expenses }) {
    return (
        <>
            <Head title="Expenses" />
            <AuthenticatedLayout>
                <section className="relative">
                    <AddingExpense categories={categories} />
                </section>
                <section className="mt-2 flex justify-center bg-white p-4 dark:bg-gray-200">
                    <GraphicBasic data={expenses} type="expenses" />
                </section>
                <section className="relative mt-2 bg-white p-2 dark:bg-gray-200">
                    <PrincipalTable data={expenses} type="expenses" />
                </section>
            </AuthenticatedLayout>
        </>
    );
}
