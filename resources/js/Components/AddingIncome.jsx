import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AddingIncome({ categories }) {
    let [view, setView] = useState(false);
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            amount: '',
            description: '',
            source: '',
            payment_method: '',
            category_id: '',
        });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('incomes.store'), {
            data,
            onSuccess: () => {
                setView(false);
                reset();
                clearErrors();
            },
        });
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-1 bg-white p-6 shadow-sm dark:bg-gray-200">
                <h1 className="text-2xl font-bold">Add Income</h1>
                <p className="mt-2 text-black">
                    Manage your income records here.
                </p>
                <button
                    onClick={() => setView(!view)}
                    className="mt-2 max-w-40 rounded-md bg-green_primary px-3 py-1 font-semibold text-quaternary"
                >
                    Add Income
                </button>
            </div>
            {view && (
                <div className="fixed inset-0 z-10 flex items-center justify-center before:absolute before:inset-0 before:bg-black before:opacity-50 before:content-['']">
                    <div className="relative z-50 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-gray-200">
                        <div
                            onClick={() => setView(!view)}
                            className="absolute right-4 top-4 cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-4 text-center text-2xl font-bold">
                            Add Income
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <label className="mb-2 block">
                                Amount:
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setData('amount', e.target.value)
                                    }
                                    defaultValue={data.amount}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                    placeholder="Amount"
                                />
                                {errors.amount && (
                                    <span className="text-sm text-red-500">
                                        {errors.amount}
                                    </span>
                                )}
                            </label>
                            <label className="mb-2 block">
                                Description
                                <span className="text-xs">(not mandatory)</span>
                                :
                                <textarea
                                    name="description"
                                    rows="4"
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    defaultValue={data.description}
                                    placeholder="Description"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                ></textarea>
                                {errors.description && (
                                    <span className="text-sm text-red-500">
                                        {errors.description}
                                    </span>
                                )}
                            </label>
                            <label className="mb-2 block">
                                Source
                                <span className="text-xs">(not mandatory)</span>
                                :
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setData('source', e.target.value)
                                    }
                                    defaultValue={data.source}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                    placeholder="Source"
                                />
                                {errors.source && (
                                    <span className="text-sm text-red-500">
                                        {errors.source}
                                    </span>
                                )}
                            </label>
                            <label className="mb-2 block">
                                Payment Method:
                                <span className="text-xs">(not mandatory)</span>
                                :
                                <select
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                    defaultValue={
                                        data.payment_method
                                            ? data.payment_method
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setData(
                                            'payment_method',
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="" disabled>
                                        Select Payment Method
                                    </option>
                                    <option value="cash">Cash</option>
                                    <option value="bank">Bank</option>
                                    <option value="credit_card">
                                        Credit Card
                                    </option>
                                    <option value="debit_card">
                                        Debit Card
                                    </option>
                                    <option value="paypal">PayPal</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.payment_method && (
                                    <span className="text-sm text-red-500">
                                        {errors.payment_method}
                                    </span>
                                )}
                            </label>
                            <label>
                                Category:
                                <select
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                    defaultValue={
                                        data.category_id ? data.category_id : ''
                                    }
                                    onChange={(e) =>
                                        setData('category_id', e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    {categories.length > 0 &&
                                        categories.map((category) => (
                                            <option
                                                key={'category-' + category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                                {errors.category_id && (
                                    <span className="text-sm text-red-600">
                                        {errors.category_id}
                                    </span>
                                )}
                            </label>
                            <button
                                className="mt-4 w-full rounded-md bg-green_primary px-4 py-2 font-semibold text-quaternary hover:bg-white"
                                type="submit"
                                disabled={processing}
                                style={{
                                    backgroundColor: processing && '#ccc',
                                    cursor: processing && 'not-allowed',
                                }}
                            >
                                {processing ? 'Submiting...' : 'Send'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
