import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout>
                <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        You're logged in!
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
