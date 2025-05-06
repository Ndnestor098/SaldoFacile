import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function HistoryFilter({ categories, type, active }) {
    const queryString = window.location.search;
    // Crear un objeto URLSearchParams a partir de la cadena de consulta
    const urlParams = new URLSearchParams(queryString);

    const { data, setData, get, clearErrors } = useForm({
        amount: urlParams.get('amount') || '',
        date: urlParams.get('date') || '',
        category_id: urlParams.get('category_id') || '',
        active: '',
    });

    useEffect(() => {
        setData('active', active);
    }, [active]);

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        get(route(type + '.history'), data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            {/* Date */}
            <div>
                <form className="flex h-full items-center">
                    <label className="h-full">
                        <span className="text-quaternary">Select a date:</span>
                        <input
                            type="text"
                            placeholder="YYYY-MM-DD"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="h-15 ml-2 rounded-md border-gray-300 bg-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-900"
                        />
                    </label>
                </form>
            </div>
            {/* Amount */}
            <div>
                <form className="flex h-full items-center">
                    <label className="h-full">
                        <span className="text-quaternary">Amount:</span>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="ml-2 h-full rounded-md border-gray-300 bg-gray-300 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-900"
                        />
                    </label>
                </form>
            </div>
            {/* Category */}
            <div className="w-full max-w-64">
                <form className="flex h-full items-center">
                    <label className="flex h-full w-full items-center">
                        <span className="text-quaternary">Category:</span>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData('category_id', e.target.value)
                            }
                            className="ml-2 h-full w-full rounded-md border-gray-300 bg-gray-300 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-900"
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
                            {categories.length > 0 &&
                                categories.map((category) => {
                                    const condition = category.type;

                                    if (condition === type) {
                                        return (
                                            <option
                                                key={'category-' + category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    }

                                    if (
                                        type.includes('recurring') &&
                                        condition.includes('recurrent_')
                                    ) {
                                        return (
                                            <option
                                                key={'category-' + category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    }
                                })}
                        </select>
                    </label>
                </form>
            </div>
            {/* Buttons */}
            <div className="flex w-full items-center justify-center gap-3 md:w-auto md:justify-end">
                <button
                    onClick={handleSubmit}
                    className="rounded-md bg-blue-400 px-4 py-2 font-bold text-white hover:shadow-lg"
                >
                    Search
                </button>
                <Link
                    href={
                        type === 'incomes'
                            ? route('incomes.history')
                            : route('expenses.history')
                    }
                    className="rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:shadow-lg"
                >
                    Clear
                </Link>
            </div>
        </>
    );
}
