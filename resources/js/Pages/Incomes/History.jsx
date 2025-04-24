import HistoryFilter from '@/Components/HistoryFilter';
import Pagination from '@/Components/Pagination';
import PrincipalTable from '@/Components/PrincipalTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function History({ incomes, categories }) {
    return (
        <>
            <Head title="History - Incomes" />
            <AuthenticatedLayout>
                {/* Filter */}
                <section className="mt-2 flex justify-between bg-white p-4 dark:bg-gray-200">
                    <HistoryFilter categories={categories} type="incomes" />
                </section>
                {/* Table */}
                <section className="relative mt-2 bg-white p-2 dark:bg-gray-200">
                    <PrincipalTable data={incomes.data} type="incomes" />
                </section>
                {/* Paginate */}
                <section className="relative mt-2 bg-white p-2 dark:bg-gray-200">
                    <Pagination links={incomes.links} />
                </section>
            </AuthenticatedLayout>
        </>
    );
}
