import { useState, useEffect } from 'react';

export default function PrincipalTable({ data, type }) {
    const [active, setActive] = useState({
        payment_method: false,
    });

    useEffect(() => {
        if (data.some((item) => item.payment_method)) {
            setActive('payment_method', true);
        }
    }, [data]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </h1>
            <div className="w-full overflow-x-auto">
                {data.length > 0 ? (
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
                                    Currency
                                </th>
                                <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                    Description
                                </th>
                                {active[0] && (
                                    <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                        Payment Method
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={'income-' + item.id}>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.date}
                                    </td>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.category?.name || 'No category'}
                                    </td>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.amount}
                                    </td>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.source || 'No source'}
                                    </td>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.currency || 'No currency'}
                                    </td>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.description || 'No description'}
                                    </td>
                                    {active[0] && (
                                        <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                            {item.payment_method ||
                                                'No Payment Method'}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="mt-4 w-full text-center">
                        <p className="text-gray-500">
                            No {type} found for the selected filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
