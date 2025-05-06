import ApplicationLogo from '@/Components/ApplicationLogo';
import NavMenu from '@/Components/NavMenu';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const { user } = usePage().props.auth;
    const summary = user.summary;
    const url = usePage().url;
    const [notification, setNotification] = useState(0);
    const [menuOpenUser, setMenuOpenUser] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const [theme, setTheme] = useState('light');

    // Cargar el tema desde localStorage en el primer render
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    // Aplicar la clase 'dark' en <html> cuando cambia el tema
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const dashboardMenu = [
        {
            name: 'Dashboard',
            route: 'dashboard',
        },
        {
            name: 'Incomes',
            route: 'incomes.index',
            subMenu: [
                { name: 'Recurring Incomes', route: 'incomes.recurring' },
                { name: 'History', route: 'incomes.history' },
                { name: 'Categories', route: 'incomes.category' },
            ],
        },
        {
            name: 'Expenses',
            route: 'expenses.index',
            subMenu: [
                { name: 'Recurring Expenses', route: 'expenses.recurring' },
                { name: 'History', route: 'expenses.history' },
                { name: 'Categories', route: 'expenses.category' },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Menu LEFT */}
            <div
                className={`sidebar-menu fixed left-0 top-0 z-50 h-full w-64 bg-[#f8f4f3] p-4 transition-transform dark:bg-gray-800 md:block ${menuOpen ? 'block' : 'hidden'}`}
            >
                <button
                    className="cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 fill-quaternary dark:text-primary md:hidden"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {/* Logotipo */}
                <Link
                    href={route('dashboard')}
                    className="flex flex-col items-center gap-2 border-b border-b-gray-800 pb-4"
                >
                    <ApplicationLogo className="w-9" />
                    <span className="font-semibold text-fifth dark:text-primary">
                        SaldoFacile
                    </span>
                </Link>
                {/* Menu */}
                <ul className="mt-4">
                    {/* ======================= Panel First ======================= */}
                    <span className="font-bold text-gray-400 dark:text-primary">
                        DASHBOARD
                    </span>
                    {/* Menu Dashboard */}
                    {dashboardMenu.map((item, index) => (
                        <NavMenu
                            key={index}
                            url={url}
                            menu={item}
                            subMenu={item.subMenu}
                        />
                    ))}
                    {/* ======================= Panel Tertiary ======================= */}
                    <span className="font-bold text-gray-400 dark:text-primary">
                        PERSONAL
                    </span>
                    <li className="group mb-1">
                        <Link
                            href=""
                            className="flex items-center rounded-md px-4 py-2 font-semibold text-quaternary hover:bg-tertiary hover:text-black group-[.active]:bg-tertiary group-[.active]:text-black dark:text-primary"
                        >
                            <i className="bx bx-bell mr-3 text-lg"></i>
                            <span className="text-sm">Notifications</span>
                            <span className="ml-auto rounded-full bg-red-200 px-2 py-0.5 text-xs font-medium tracking-wide text-red-600 md:block">
                                5
                            </span>
                        </Link>
                    </li>
                    <li className="group mb-1">
                        <Link
                            href=""
                            className="flex items-center rounded-md px-4 py-2 font-semibold text-quaternary hover:bg-tertiary hover:text-black group-[.active]:bg-tertiary group-[.active]:text-black dark:text-primary"
                        >
                            <i className="bx bx-envelope mr-3 text-lg"></i>
                            <span className="text-sm">Messages</span>
                            <span className="ml-auto rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium tracking-wide text-green-600 md:block">
                                2 New
                            </span>
                        </Link>
                    </li>
                </ul>
                <div className="absolute bottom-2 flex h-8 w-full items-center justify-between pr-6">
                    <span className="font-semibold text-quaternary dark:text-primary">
                        Thema
                    </span>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            className="peer sr-only"
                            type="checkbox"
                            checked={theme === 'dark'}
                            onChange={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                        />
                        <div className="h-8 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-500 after:absolute after:left-1 after:top-1 after:flex after:h-6 after:w-6 after:items-center after:justify-center after:rounded-full after:bg-white after:text-lg after:shadow-md after:transition-all after:duration-500 after:content-['☀️'] peer-checked:from-blue-400 peer-checked:to-indigo-500 peer-checked:after:translate-x-8 peer-checked:after:content-['🌙']"></div>
                    </label>
                </div>
            </div>
            <div
                className={`sidebar-overlay fixed left-0 top-0 z-40 h-full w-full bg-black/50 ${menuOpen ? 'block' : 'hidden'}`}
                onClick={() => setMenuOpen(!menuOpen)}
            ></div>
            <main className="main min-h-screen w-full bg-gray-200 transition-all dark:bg-gray-400 md:ml-64 md:w-[calc(100%-256px)]">
                {/* Menu TOP */}
                <div className="sticky left-0 top-0 z-30 flex items-center bg-[#f8f4f3] px-6 py-2 shadow-md shadow-black/5 dark:bg-gray-800">
                    <button
                        type="button"
                        className="sidebar-toggle text-lg font-semibold text-gray-900"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 fill-quaternary dark:text-primary md:hidden"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>

                    <ul className="ml-auto flex items-center gap-2">
                        {/* Boton de buscador */}
                        <li className="dropdown">
                            {/* Boton para activar el buscador */}
                            <button
                                type="button"
                                className="dropdown-toggle flex h-8 w-8 items-center justify-center rounded text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    className="rounded-full fill-gray-400 hover:bg-secondary hover:fill-quaternary dark:fill-primary"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
                                </svg>
                            </button>
                            {/* Buscador */}
                            <div className="dropdown-menu z-30 hidden w-full max-w-xs rounded-md border border-gray-100 bg-white shadow-md shadow-black/5">
                                <form
                                    action=""
                                    className="border-b border-b-gray-100 p-4"
                                >
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            className="w-full rounded-md border border-gray-100 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                                            placeholder="Search..."
                                        />
                                        <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-900"></i>
                                    </div>
                                </form>
                            </div>
                        </li>
                        {/* Boton de notificaciones */}
                        <li className="dropdown">
                            {/* Botones para activar las listas */}
                            <button
                                type="button"
                                className="dropdown-toggle flex h-8 w-8 items-center justify-center rounded text-gray-400 hover:text-gray-600"
                                onClick={() => {
                                    if (notification === 0) setNotification(1);
                                    if (notification > 0) setNotification(0);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    className="rounded-full fill-gray-400 hover:bg-secondary hover:fill-quaternary dark:fill-primary"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path>
                                </svg>
                            </button>
                            <div
                                className="dropdown-menu z-30 w-full max-w-xs rounded-md border border-gray-100 bg-white shadow-md shadow-black/5"
                                style={
                                    notification > 0
                                        ? {
                                              position: 'absolute',
                                              inset: '0px 0px auto auto',
                                              margin: '0xp',
                                              transform:
                                                  'translate(-204px, 58px)',
                                          }
                                        : {
                                              display: 'none',
                                          }
                                }
                            >
                                {/* Botones para moverse entre listas */}
                                <div className="notification-tab flex items-center border-b border-b-gray-100 px-4 pt-4">
                                    <button
                                        type="button"
                                        data-tab="notification"
                                        data-tab-page="notifications"
                                        className={
                                            notification === 1
                                                ? 'mr-4 border-b-2 border-blue-500 pb-1 text-[13px] font-medium text-blue-400 hover:text-gray-600'
                                                : 'mr-4 border-b-2 border-b-transparent pb-1 text-[13px] font-medium text-gray-400 hover:text-gray-600'
                                        }
                                        onClick={() => setNotification(1)}
                                    >
                                        Notifications
                                    </button>
                                    <button
                                        type="button"
                                        data-tab="notification"
                                        data-tab-page="messages"
                                        className={
                                            notification === 2
                                                ? 'mr-4 border-b-2 border-blue-500 pb-1 text-[13px] font-medium text-blue-400 hover:text-gray-600'
                                                : 'mr-4 border-b-2 border-b-transparent pb-1 text-[13px] font-medium text-gray-400 hover:text-gray-600'
                                        }
                                        onClick={() => setNotification(2)}
                                    >
                                        Messages
                                    </button>
                                </div>
                                {/* Lista de Mensajes y Notificaciones */}
                                <div className="my-2">
                                    {/* Notification */}
                                    <ul
                                        className={
                                            notification === 1
                                                ? 'max-h-64 overflow-y-auto'
                                                : 'hidden max-h-64 overflow-y-auto'
                                        }
                                        data-tab-for="notification"
                                        data-page="notifications"
                                    >
                                        <li>
                                            <Link
                                                href="#"
                                                className="group flex items-center px-4 py-2 hover:bg-gray-50"
                                            >
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="block h-8 w-8 rounded object-cover align-middle"
                                                />
                                                <div className="ml-2">
                                                    <div className="runcate text-[13px] font-medium text-gray-600 group-hover:text-blue-500">
                                                        New order
                                                    </div>
                                                    <div className="text-[11px] text-gray-400">
                                                        from a user
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="group flex items-center px-4 py-2 hover:bg-gray-50"
                                            >
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="block h-8 w-8 rounded object-cover align-middle"
                                                />
                                                <div className="ml-2">
                                                    <div className="runcate text-[13px] font-medium text-gray-600 group-hover:text-blue-500">
                                                        New order
                                                    </div>
                                                    <div className="text-[11px] text-gray-400">
                                                        from a user
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                    {/* Nessage */}
                                    <ul
                                        className={
                                            notification === 2
                                                ? 'max-h-64 overflow-y-auto'
                                                : 'hidden max-h-64 overflow-y-auto'
                                        }
                                        data-tab-for="notification"
                                        data-page="messages"
                                    >
                                        <li>
                                            <a
                                                href="#"
                                                className="group flex items-center px-4 py-2 hover:bg-gray-50"
                                            >
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="block h-8 w-8 rounded object-cover align-middle"
                                                />
                                                <div className="ml-2">
                                                    <div className="runcate text-[13px] font-medium text-gray-600 group-hover:text-blue-500">
                                                        John Doe
                                                    </div>
                                                    <div className="text-[11px] text-gray-400">
                                                        Hello there!
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="group flex items-center px-4 py-2 hover:bg-gray-50"
                                            >
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="block h-8 w-8 rounded object-cover align-middle"
                                                />
                                                <div className="ml-2">
                                                    <div className="runcate text-[13px] font-medium text-gray-600 group-hover:text-blue-500">
                                                        John Doe
                                                    </div>
                                                    <div className="text-[11px] text-gray-400">
                                                        Hello there!
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <button
                            id="fullscreen-button"
                            onClick={() => {
                                if (document.fullscreenElement) {
                                    document.exitFullscreen();
                                } else {
                                    document.documentElement.requestFullscreen();
                                }
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                className="rounded-full fill-gray-400 hover:bg-secondary hover:fill-quaternary dark:fill-primary"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path>
                            </svg>
                        </button>
                        {/* ================================ Area Usuario ================================ */}
                        <li
                            className="dropdown"
                            onClick={() => setMenuOpenUser(!menuOpenUser)}
                        >
                            <button
                                type="button"
                                className="dropdown-toggle flex items-center"
                            >
                                <div className="relative h-10 w-10 flex-shrink-0">
                                    <div className="rounded-full bg-white p-1 focus:outline-none focus:ring">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                                            alt=""
                                        />
                                        <div className="absolute left-7 top-0 h-3 w-3 animate-ping rounded-full border-2 border-white bg-lime-400"></div>
                                        <div className="absolute left-7 top-0 h-3 w-3 rounded-full border-2 border-white bg-lime-500"></div>
                                    </div>
                                </div>
                                <div className="p-2 text-left md:block">
                                    <h2 className="text-sm font-semibold text-gray-800 dark:text-primary">
                                        {user.name}
                                    </h2>
                                    <p className="text-xs text-gray-500 dark:text-primary">
                                        Balance:
                                        <span
                                            className={`font-bold ${
                                                summary
                                                    ? summary &&
                                                      summary.net_balance > 0
                                                        ? 'text-green-800 dark:text-green_primary'
                                                        : 'text-red-800 dark:text-red_primary'
                                                    : 'text-white'
                                            }`}
                                        >
                                            {summary
                                                ? ' ' +
                                                  summary.net_balance.toFixed(2)
                                                : ' 0'}
                                        </span>
                                    </p>
                                </div>
                            </button>
                            <ul
                                id="menuUser"
                                className={`dropdown-menu z-30 w-full max-w-[140px] rounded-md border border-gray-100 bg-white py-1.5 shadow-md shadow-black/5 ${
                                    menuOpenUser ? '' : 'hidden'
                                }`}
                                style={{
                                    position: 'absolute',
                                    inset: '0px 0px auto auto',
                                    margin: '0px',
                                    transform: 'translate(-24px, 68px)',
                                }}
                            >
                                <li>
                                    <Link
                                        href={route('profile.index')}
                                        className="flex items-center px-4 py-1.5 text-[13px] text-gray-600 hover:bg-secondary hover:font-semibold hover:text-quaternary"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="flex items-center px-4 py-1.5 text-[13px] text-gray-600 hover:bg-secondary hover:font-semibold hover:text-quaternary"
                                    >
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        role="menuitem"
                                        className="flex w-full cursor-pointer items-center px-4 py-1.5 text-[13px] text-gray-600 hover:bg-secondary hover:font-semibold hover:text-quaternary"
                                        href={route('logout')}
                                        method="post"
                                    >
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="pb-5 pt-5 md:pb-8 md:pt-8">
                    <div className="max-w-8xl mx-2 sm:px-6 md:mx-auto lg:px-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
