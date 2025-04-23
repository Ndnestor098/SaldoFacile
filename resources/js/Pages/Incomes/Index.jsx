import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout>
                <section>
                    <div>
                        <h1 className="text-2xl font-bold">Incomes</h1>
                        <p className="mt-2 text-gray-600">
                            Manage your income records here.
                        </p>
                    </div>
                </section>
                <section></section>
            </AuthenticatedLayout>
        </>
    );
}
