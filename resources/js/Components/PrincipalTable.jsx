import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function PrincipalTable({ data, type }) {
    const [active, setActive] = useState({
        payment_method: false,
        frequency: false,
        payment_date: false,
        end_date: false,
    });

    useEffect(() => {
        if (data.some((item) => item.payment_method)) {
            setActive((prev) => ({ ...prev, payment_method: true }));
        }

        if (data.some((item) => item.frequency)) {
            setActive((prev) => ({ ...prev, frequency: true }));
        }

        if (data.some((item) => item.payment_date)) {
            setActive((prev) => ({ ...prev, payment_date: true }));
        }

        if (data.some((item) => item.end_date)) {
            setActive((prev) => ({ ...prev, end_date: true }));
        }
    }, [data]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">
                {type.includes('.')
                    ? type.split('.').map((t, i) => (
                          <span key={i}>
                              {t.charAt(0).toUpperCase() + t.slice(1)}
                              {i < type.split('.').length - 1 && '  '}
                          </span>
                      ))
                    : type.charAt(0).toUpperCase() + type.slice(1)}
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
                                {active.payment_method == true && (
                                    <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                        Payment Method
                                    </th>
                                )}
                                {active.frequency == true && (
                                    <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                        Frequency
                                    </th>
                                )}
                                {active.payment_date == true && (
                                    <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                        Payment Date
                                    </th>
                                )}
                                {active.end_date == true && (
                                    <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                        End Date
                                    </th>
                                )}
                                <th className="border border-quaternary bg-gray-200 px-4 py-2 dark:bg-gray-400">
                                    Delete
                                </th>
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
                                    {active.payment_method && (
                                        <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                            {item.payment_method ||
                                                'No Payment Method'}
                                        </td>
                                    )}
                                    {active.frequency && (
                                        <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                            {item.frequency || 'No Specified'}
                                        </td>
                                    )}
                                    {active.payment_date && (
                                        <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                            {item.payment_date ||
                                                'Not specified'}
                                        </td>
                                    )}
                                    {active.end_date && (
                                        <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                            {item.end_date || 'Not specified'}
                                        </td>
                                    )}
                                    <td className="border border-quaternary bg-red_primary px-4 py-2 text-center font-bold text-white">
                                        <Link
                                            href={route(
                                                type + '.destroy',
                                                item.id,
                                            )}
                                            method="delete"
                                            as="button"
                                            className="h-full w-full"
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        'Are you sure you want to delete this category?',
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
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
