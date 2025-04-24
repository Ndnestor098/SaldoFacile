export default function PrincipalTable({ data, type }) {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </h1>
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
                        {data.length > 0 &&
                            data.slice(0, 5).map((item) => (
                                <tr key={'income-' + item.id}>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.date}
                                    </td>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.category.name}
                                    </td>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.amount}
                                    </td>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.source || 'No source'}
                                    </td>
                                    <td className="border border-quaternary bg-white px-4 py-2 dark:bg-gray-300">
                                        {item.description || 'No description'}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
