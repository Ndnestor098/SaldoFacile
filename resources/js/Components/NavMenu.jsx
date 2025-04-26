import { Link, usePage } from '@inertiajs/react';

export default function NavMenu({ url, menu, subMenu = false }) {
    const { url: currentUrl } = usePage();

    return (
        <>
            <li
                className={
                    url.includes('/' + menu.name.toLowerCase())
                        ? 'active group mb-1'
                        : 'group mb-1'
                }
            >
                <Link
                    href={route(menu.route)}
                    className="flex items-center rounded-md px-4 py-2 font-semibold text-quaternary hover:bg-tertiary hover:text-black group-[.active]:bg-tertiary group-[.active]:text-black dark:text-primary"
                >
                    <i className="bx bx-user mr-3 text-lg"></i>
                    <span className="text-sm">{menu.name}</span>
                    {subMenu != false && (
                        <>
                            <i className="ri-arrow-right-s-line ml-auto group-[.active]:rotate-90"></i>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="ri-arrow-right-s-line ml-auto size-4 group-[.active]:rotate-90"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </>
                    )}
                </Link>
                <ul className="mt-2 hidden pl-7 group-[.active]:block">
                    {subMenu != false &&
                        subMenu.map((item, index) => {
                            const verifyUrl = currentUrl.split('/');
                            const url = route(item.route, {}, false);
                            const isActive =
                                verifyUrl.length === 2
                                    ? false
                                    : url.includes(currentUrl);

                            return (
                                <li className="mb-4" key={'submenu' + index}>
                                    <Link
                                        href={route(item.route)}
                                        className={
                                            "before:contents-[''] flex items-center text-sm text-gray-900 duration-150 before:mr-3 before:h-1 before:w-1 before:rounded-full before:bg-gray-300 hover:font-semibold hover:text-seventh dark:text-primary" +
                                            (isActive
                                                ? 'text-lg font-bold text-gray-900 dark:text-primary'
                                                : '')
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </li>
        </>
    );
}
