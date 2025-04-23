import AddingIncome from '@/Components/AddingIncome';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ categories, incomes }) {
    console.log(incomes);
    return (
        <>
            <Head title="Incomes" />
            <AuthenticatedLayout>
                <section className="relative">
                    <AddingIncome categories={categories} />
                </section>
                <section className="relative mt-2 bg-white p-2 dark:bg-gray-200">
                    <div className="flex h-full w-full flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold">Incomes</h1>
                        <div className="w-full overflow-x-auto">
                            <table className="mt-4 w-full table-auto border-collapse border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                            Date
                                        </th>
                                        <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                            Category
                                        </th>
                                        <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                            Amount
                                        </th>
                                        <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                            Source
                                        </th>
                                        <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incomes.length > 0 &&
                                        incomes.map((income) => (
                                            <tr key={'income-' + income.id}>
                                                <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                                    {income.date}
                                                </td>
                                                <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                                    {income.category.name}
                                                </td>
                                                <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                                    {income.amount}
                                                </td>
                                                <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                                    {income.source ||
                                                        'No source'}
                                                </td>
                                                <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                                    {income.description ||
                                                        'No description'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </AuthenticatedLayout>
        </>
    );
}
