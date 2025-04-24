import { router } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex justify-center">
            <nav className="flex space-x-2" aria-label="Pagination">
                {links.map((link, i) => {
                    const isActive = link.active;
                    const isPrevOrNext = /Previous|Next/.test(link.label);

                    return (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                            className={`relative items-center rounded-md px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${
                                isPrevOrNext
                                    ? 'bg-gray-200 font-semibold text-quaternary dark:bg-[#173764] dark:text-white'
                                    : isActive
                                      ? 'border border-quaternary bg-gray-300 font-semibold text-quaternary dark:bg-quaternary dark:text-white'
                                      : 'border border-quaternary bg-gray-300 text-gray-700 hover:bg-quaternary hover:text-white'
                            } ${!link.url ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        />
                    );
                })}
            </nav>
        </div>
    );
}
