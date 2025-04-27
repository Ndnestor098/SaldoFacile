import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import CustomIconSelect from './CustomIconSelect';

function getRandomPastelHexColor() {
    const randomChannel = () => Math.floor(Math.random() * 127 + 127);
    const r = randomChannel();
    const g = randomChannel();
    const b = randomChannel();
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function AddingCategory({ icons, type }) {
    let [view, setView] = useState(false);
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            name: '',
            icon: '',
            text_color: getRandomPastelHexColor(),
            background_color: '#ffffff',
            type: '',
        });

    function handleSubmit(e) {
        e.preventDefault();

        if (!data.text_color) {
            setData('text_color', getRandomPastelColor());
        }

        if (!data.background_color) {
            setData('background_color', '#ffffff');
        }

        post(route(type + '.category.store'), {
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
                <h1 className="text-2xl font-bold">
                    Add {type.charAt(0).toUpperCase() + type.slice(1)} Category
                </h1>
                {type === 'expenses' && (
                    <div className="rounded-md bg-gray-100 p-5 text-base text-gray-700 dark:bg-gray-200 dark:text-gray-800">
                        <p className="mb-3">
                            It is recommended to add categories like{' '}
                            <span className="font-semibold">Rent</span>,{' '}
                            <span className="font-semibold">Mortgage</span>,{' '}
                            <span className="font-semibold">Credit</span>,{' '}
                            <span className="font-semibold">Loans</span>, and{' '}
                            <span className="font-semibold">
                                Ongoing Services
                            </span>{' '}
                            under the{' '}
                            <span className="italic">"Recurrent Expenses"</span>{' '}
                            section, as this area automatically manages
                            recurring charges.
                        </p>
                        <p>
                            For one-time purchases, it is suggested to use the{' '}
                            <span className="italic">"Expenses"</span> section
                            for items like{' '}
                            <span className="font-semibold">Clothing</span>,{' '}
                            <span className="font-semibold">Electronics</span>,{' '}
                            <span className="font-semibold">Travel</span>, and{' '}
                            <span className="font-semibold">Dining Out</span>,{' '}
                            as these are considered occasional, non-recurring
                            expenses.
                        </p>
                    </div>
                )}

                {type === 'incomes' && (
                    <div className="rounded-md bg-gray-100 p-5 text-base text-gray-700 dark:bg-gray-200 dark:text-gray-800">
                        <p className="mb-3">
                            It is recommended to add categories like{' '}
                            <span className="font-semibold">Salary</span>,{' '}
                            <span className="font-semibold">Rental Income</span>
                            , <span className="font-semibold">Pensions</span>,{' '}
                            <span className="font-semibold">
                                Business Profits
                            </span>
                            , and{' '}
                            <span className="font-semibold">
                                Investment Returns
                            </span>{' '}
                            under the{' '}
                            <span className="italic">"Recurrent Incomes"</span>{' '}
                            section, as these categories involve regular,
                            recurring income streams that need automatic
                            management.
                        </p>
                        <p>
                            For one-time or occasional incomes, it is suggested
                            to use the
                            <span className="italic"> "Incomes"</span> section
                            for items such as{' '}
                            <span className="font-semibold">
                                Freelance Payments
                            </span>
                            , <span className="font-semibold">Bonuses</span>,{' '}
                            <span className="font-semibold">Gifts</span>, and{' '}
                            <span className="font-semibold">
                                Lottery Prizes
                            </span>
                            , as these are non-recurring income sources.
                        </p>
                    </div>
                )}

                <button
                    onClick={() => setView(!view)}
                    className={`mt-2 max-w-40 rounded-md px-3 py-1 font-semibold ${
                        type === 'incomes'
                            ? 'bg-green_primary text-quaternary'
                            : 'bg-red_primary text-white hover:bg-quaternary'
                    }`}
                >
                    Create Category
                </button>
            </div>
            {view && (
                <div className="fixed inset-0 z-40 flex items-center justify-center before:absolute before:inset-0 before:bg-black before:opacity-50 before:content-['']">
                    <div className="relative z-50 m-1 w-full rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 dark:text-gray-200 sm:max-w-xl sm:p-6">
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
                            Add
                            {' ' +
                                type.charAt(0).toUpperCase() +
                                type.slice(1) +
                                ' '}
                            Category
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <label>
                                Icons:
                                <CustomIconSelect
                                    icons={icons}
                                    data={data}
                                    setData={setData}
                                />
                                {errors.icon && (
                                    <span className="text-sm text-red-500">
                                        {errors.icon}
                                    </span>
                                )}
                            </label>
                            <label className="mb-2 block">
                                Name:
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    defaultValue={data.name}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                    placeholder="Name of the category"
                                    required
                                    autoComplete="off"
                                    autoFocus
                                />
                                {errors.name && (
                                    <span className="text-sm text-red-500">
                                        {errors.name}
                                    </span>
                                )}
                            </label>
                            <label className="mb-2 block">
                                Type of Category:
                                <select
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-quaternary focus:border-blue-500 focus:outline-none"
                                    defaultValue={data.type ? data.type : ''}
                                    onChange={(e) =>
                                        setData('type', e.target.value)
                                    }
                                >
                                    <option value="" disabled hidden>
                                        Select Type
                                    </option>
                                    <option value={type}>
                                        {type.charAt(0).toUpperCase() +
                                            type.slice(1)}
                                    </option>
                                    <option value={'recurrent_' + type}>
                                        Recurrent{' '}
                                        {type.charAt(0).toUpperCase() +
                                            type.slice(1)}
                                    </option>
                                </select>
                                {errors.type && (
                                    <span className="text-sm text-red-500">
                                        {errors.type}
                                    </span>
                                )}
                            </label>
                            <div className="flex flex-col">
                                <label className="text-gray-700 dark:text-gray-200">
                                    Text Color
                                    <span className="text-xs font-normal text-gray-500 dark:text-gray-300">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    type="color"
                                    onChange={(e) =>
                                        setData('text_color', e.target.value)
                                    }
                                    defaultValue={data.text_color}
                                    className="h-10 w-24 cursor-pointer rounded-md border border-gray-300 bg-white p-1 focus:border-blue-500 focus:outline-none"
                                />
                                {errors.text_color && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.text_color}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-700 dark:text-gray-200">
                                    Background Color
                                    <span className="text-xs font-normal text-gray-500 dark:text-gray-300">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    type="color"
                                    onChange={(e) =>
                                        setData(
                                            'background_color',
                                            e.target.value,
                                        )
                                    }
                                    defaultValue={data.background_color}
                                    className="h-10 w-24 cursor-pointer rounded-md border border-gray-300 bg-white p-1 focus:border-blue-500 focus:outline-none"
                                />
                                {errors.background_color && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.background_color}
                                    </span>
                                )}
                            </div>
                            <button
                                className={`mt-4 w-full rounded-md px-4 py-2 font-semibold ${
                                    type === 'incomes'
                                        ? 'bg-green_primary text-quaternary hover:bg-white'
                                        : 'bg-red_primary text-white hover:bg-white hover:text-quaternary'
                                }`}
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
