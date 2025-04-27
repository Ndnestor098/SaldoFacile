import { Link } from '@inertiajs/react';
import { DynamicIcon } from 'lucide-react/dynamic';

function isDarkColor(hexColor) {
    if (!hexColor) return false;
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    // Fórmula de luminancia percibida
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance < 0.5; // Si la luminancia es baja, el color es oscuro
}

export default function CategoryTag({ categories, type }) {
    return (
        <>
            <div className="mb-5 flex items-center justify-center">
                <h1 className="text-2xl font-bold text-quaternary">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Categories
                </h1>
            </div>
            <div className="container mx-auto flex flex-wrap items-center justify-evenly gap-4">
                {categories.map((category) => {
                    const condition = category.type;

                    return (
                        condition === type && (
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
                                <span
                                    className={`text-center text-sm font-semibold ${
                                        isDarkColor(category.background_color)
                                            ? 'text-white'
                                            : 'text-black'
                                    }`}
                                >
                                    {category.name}
                                </span>
                                <span
                                    className={`cursor-pointer hover:text-red-500 ${
                                        isDarkColor(category.background_color)
                                            ? 'text-white'
                                            : 'text-quaternary'
                                    }`}
                                >
                                    <Link
                                        href={route(
                                            type + '.category.destroy',
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
                        )
                    );
                })}
            </div>
            <div className="my-5 flex items-center justify-center">
                <h1 className="text-2xl font-bold text-quaternary">
                    Recurrent
                    {' ' + type.charAt(0).toUpperCase() + type.slice(1) + ' '}
                    Categories
                </h1>
            </div>
            <div className="container mx-auto flex flex-wrap items-center justify-evenly gap-4">
                {categories.map((category) => {
                    const condition = category.type;

                    return (
                        condition === 'recurrent_' + type && (
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
                                <span
                                    className={`text-center text-sm font-semibold ${
                                        isDarkColor(category.background_color)
                                            ? 'text-white'
                                            : 'text-black'
                                    }`}
                                >
                                    {category.name}
                                </span>
                                <span
                                    className={`cursor-pointer hover:text-red-500 ${
                                        isDarkColor(category.background_color)
                                            ? 'text-white'
                                            : 'text-quaternary'
                                    }`}
                                >
                                    <Link
                                        href={route(
                                            type + '.category.destroy',
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
                        )
                    );
                })}
            </div>
        </>
    );
}
