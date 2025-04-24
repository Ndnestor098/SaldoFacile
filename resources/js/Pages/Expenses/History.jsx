import HistoryFilter from '@/Components/HistoryFilter';
import Pagination from '@/Components/Pagination';
import PrincipalTable from '@/Components/PrincipalTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function History({ expenses, categories }) {
    console.log(expenses);
    return (
        <>
            <Head title="History - Expenses" />
            <AuthenticatedLayout>
                {/* Filter */}
                <section className="mt-2 flex justify-between bg-white p-4 dark:bg-gray-200">
                    <HistoryFilter categories={categories} type="expenses" />
                </section>
                {/* Table */}
                <section className="relative mt-2 bg-white p-2 dark:bg-gray-200">
                    <PrincipalTable data={expenses.data} type="expenses" />
                </section>
                {/* Paginate */}
                <section className="relative mt-2 bg-white p-2 dark:bg-gray-200">
                    <Pagination links={expenses.links} />
                </section>
            </AuthenticatedLayout>
        </>
    );
}
