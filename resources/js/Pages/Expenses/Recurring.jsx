import AddingRecurrentExpense from '@/Components/AddingRecurrentExpense';
import GraphicBasic from '@/Components/GraphicBasic';
import PrincipalTable from '@/Components/PrincipalTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import swal from 'sweetalert';

export default function Recurring({ categories, expenses }) {
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
            <Head title="Recurrent - Expenses" />
            <AuthenticatedLayout>
                <section className="relative">
                    <AddingRecurrentExpense categories={categories} />
                </section>
                <section className="mt-2 flex justify-center bg-white p-4 dark:bg-gray-200">
                    <GraphicBasic data={expenses} type="expenses" />
                </section>
                <section className="relative mt-2 bg-white p-2 dark:bg-gray-200">
                    <PrincipalTable data={expenses} type="expenses.recurring" />
                </section>
            </AuthenticatedLayout>
        </>
    );
}
