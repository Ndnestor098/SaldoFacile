import AddingIncome from '@/Components/AddingIncome';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ categories }) {
    return (
        <>
            <Head title="Incomes" />
            <AuthenticatedLayout>
                <section className="relative">
                    <AddingIncome categories={categories} />
                </section>
                <section></section>
            </AuthenticatedLayout>
        </>
    );
}
