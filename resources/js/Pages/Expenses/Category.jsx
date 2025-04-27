import AddingCategory from '@/Components/AddingCategory';
import CategoryTag from '@/Components/CategoryTag';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import swal from 'sweetalert';

export default function Categoy({ categories, icons }) {
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
            <Head title="Category - Expenses" />
            <AuthenticatedLayout>
                <section className="relative">
                    <AddingCategory icons={icons} type="expenses" />
                </section>
                <section className="mt-2 flex flex-col justify-center bg-white p-4 dark:bg-gray-200">
                    <CategoryTag categories={categories} type="expenses" />
                </section>
            </AuthenticatedLayout>
        </>
    );
}
