import HistoryFilter from '@/Components/HistoryFilter';
import Pagination from '@/Components/Pagination';
import PrincipalTable from '@/Components/PrincipalTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import swal from 'sweetalert';

export default function History({ expenses, categories }) {
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
                {/* Filter */}
                <section className="mt-2 flex flex-wrap justify-between gap-4 bg-white p-4 dark:bg-gray-200 md:flex-nowrap md:gap-0">
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
