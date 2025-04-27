import { Link } from '@inertiajs/react';
import { DynamicIcon } from 'lucide-react/dynamic';

export default function CategoryTag({ categories, type }) {
    return (
        <div className="container mx-auto flex flex-wrap items-center justify-evenly gap-4">
            {categories.map((category) => {
                const $condition = category.type;
                if (!$condition.includes(type)) {
                    return;
                }
                return (
                    <div
                        key={category.id}
                        className="flex items-center justify-center gap-2 rounded-lg px-3 py-1 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                        style={{
                            backgroundColor: category.background_color,
                        }}
                    >
                        {true == true && (
                            <DynamicIcon
                                name={category.icon.name}
                                className="size-4"
                                style={{ color: category.text_color }}
                            />
                        )}
                        <span className="text-center text-sm font-semibold">
                            {category.name}
                        </span>
                        <span className="cursor-pointer text-quaternary hover:text-red-500">
                            <Link
                                href={route(
                                    'incomes.category.destroy',
                                    category.id,
                                )}
                                method="delete"
                                as="button"
                                onClick={(e) => {
                                    if (
                                        !confirm(
                                            'Are you sure you want to delete this category?',
                                        )
                                    ) {
                                        e.preventDefault();
                                    }
                                }}
                                className="flex items-center justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </Link>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
