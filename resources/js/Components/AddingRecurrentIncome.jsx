import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AddingRecurrentIncome({ categories }) {
    let [view, setView] = useState(false);
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            amount: '',
            description: '',
            source: '',
            payment_method: '',
            category_id: '',
            frequency: '',
            end_date: '',
            payment_date: '',
        });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('incomes.recurring.store'), {
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
                <h1 className="text-2xl font-bold">Add Recurrent Income</h1>
                <p className="mt-2 text-black">
                    <strong>Did you know?</strong> You can add recurring income
                    here — like your salary or side gigs — and we’ll
                    automatically log it on the date you choose.
                </p>
                <button
                    onClick={() => setView(!view)}
                    className="max-w-46 mt-2 rounded-md bg-green_primary px-3 py-1 font-semibold text-quaternary"
                >
                    Add Recurrent Income
                </button>
            </div>
            {view && (
                <div className="fixed inset-0 z-40 flex items-center justify-center overflow-auto before:absolute before:inset-0 before:bg-black before:opacity-50 before:content-['']">
                    <div className="relative z-50 mx-1 my-2 max-h-screen w-full overflow-y-auto rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 dark:text-gray-200 sm:h-auto sm:max-w-xl sm:p-6">
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
                            Add Recurrent Income
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="flex h-full flex-col gap-4"
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
                                Frequency
                                <select
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                    defaultValue={
                                        data.frequency ? data.frequency : ''
                                    }
                                    onChange={(e) =>
                                        setData('frequency', e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select Frecuency
                                    </option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                                {errors.frequency && (
                                    <span className="text-sm text-red-500">
                                        {errors.frequency}
                                    </span>
                                )}
                            </label>
                            {data.frequency != 'daily' &&
                                data.frequency != '' && (
                                    <label className="mb-2 block">
                                        {data.frequency === 'monthly' && (
                                            <>
                                                Payment Day of the Month:
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="31"
                                                    onChange={(e) =>
                                                        setData(
                                                            'payment_date',
                                                            e.target.value,
                                                        )
                                                    }
                                                    defaultValue={data.end_date}
                                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                                    placeholder="Day of the month for payment"
                                                />
                                            </>
                                        )}

                                        {data.frequency === 'weekly' && (
                                            <>
                                                Day of the Week:
                                                <select
                                                    onChange={(e) =>
                                                        setData(
                                                            'payment_date',
                                                            e.target.value,
                                                        )
                                                    }
                                                    defaultValue={data.end_date}
                                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                                    placeholder="Día de la semana para el pago"
                                                >
                                                    <option value="" disabled>
                                                        Select Day of the Week
                                                    </option>
                                                    <option value="monday">
                                                        Monday
                                                    </option>
                                                    <option value="tuesday">
                                                        Tuesday
                                                    </option>
                                                    <option value="wednesday">
                                                        Wednesday
                                                    </option>
                                                    <option value="thursday">
                                                        Thursday
                                                    </option>
                                                    <option value="friday">
                                                        Friday
                                                    </option>
                                                    <option value="saturday">
                                                        Saturday
                                                    </option>
                                                    <option value="sunday">
                                                        Sunday
                                                    </option>
                                                </select>
                                            </>
                                        )}

                                        {data.frequency === 'yearly' && (
                                            <>
                                                Payment Month and Day:
                                                <select
                                                    onChange={(e) =>
                                                        setData(
                                                            'payment_date',
                                                            e.target.value,
                                                        )
                                                    }
                                                    defaultValue={data.end_date}
                                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                                    placeholder="Día de la semana para el pago"
                                                >
                                                    <option value="" disabled>
                                                        Select Day of the Week
                                                    </option>
                                                    <option value="january">
                                                        January
                                                    </option>
                                                    <option value="february">
                                                        February
                                                    </option>
                                                    <option value="march">
                                                        March
                                                    </option>
                                                    <option value="june">
                                                        June
                                                    </option>
                                                    <option value="july">
                                                        July
                                                    </option>
                                                    <option value="august">
                                                        August
                                                    </option>
                                                    <option value="september">
                                                        September
                                                    </option>
                                                    <option value="october">
                                                        October
                                                    </option>
                                                    <option value="november">
                                                        November
                                                    </option>
                                                    <option value="dicember">
                                                        Dicember
                                                    </option>
                                                </select>
                                            </>
                                        )}

                                        {errors.payment_date && (
                                            <span className="text-sm text-red-500">
                                                {errors.payment_date}
                                            </span>
                                        )}
                                    </label>
                                )}
                            <label className="mb-2 block">
                                End Date:
                                <input
                                    type="date"
                                    onChange={(e) =>
                                        setData('end_date', e.target.value)
                                    }
                                    defaultValue={data.end_date}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                    placeholder="Amount"
                                />
                                {errors.end_date && (
                                    <span className="text-sm text-red-500">
                                        {errors.end_date}
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
                            <label className="mb-2 block">
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
                                        categories.map((category) => {
                                            return (
                                                category.type ===
                                                    'recurrent_incomes' && (
                                                    <option
                                                        key={
                                                            'category-' +
                                                            category.id
                                                        }
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                )
                                            );
                                        })}
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
