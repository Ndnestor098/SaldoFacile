import AddingRecurrentIncome from '@/Components/AddingRecurrentIncome';
import GraphicBasic from '@/Components/GraphicBasic';
import PrincipalTable from '@/Components/PrincipalTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Recurring({ categories, incomes }) {
    return (
        <>
            <Head title="Recurrent - Incomes" />
            <AuthenticatedLayout>
                <section className="relative">
                    <AddingRecurrentIncome categories={categories} />
                </section>
                <section className="mt-2 flex justify-center bg-white p-4 dark:bg-gray-200">
                    <GraphicBasic data={incomes} type="incomes" />
                </section>
                <section className="relative mt-2 bg-white p-2 dark:bg-gray-200">
                    <PrincipalTable data={incomes} type="incomes.recurring" />
                </section>
            </AuthenticatedLayout>
        </>
    );
}
