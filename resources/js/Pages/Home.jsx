import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <header className="relative z-20 flex w-full items-center justify-between px-5 py-2 lg:px-10 lg:pt-5">
                <div className="flex flex-col items-center justify-center gap-1">
                    <img
                        src="/assets/images/pig.webp"
                        alt="Logo"
                        className="w-9 lg:w-12"
                        draggable="false"
                    />
                    <span className="font-bold text-seventh">SaldoFacile</span>
                </div>
                <nav>
                    <ul className="flex w-full gap-5">
                        <li>
                            <Link
                                className="rounded-lg bg-tertiary px-4 py-1 font-bold text-quaternary lg:px-5 lg:py-2"
                                href={route('login')}
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="rounded-lg bg-tertiary px-4 py-1 font-bold text-quaternary lg:px-5 lg:py-2"
                                href={route('register')}
                            >
                                Register
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="flex h-full w-full flex-col items-center justify-around lg:flex-row">
                <div
                    className="fixed left-0 top-0 z-[-10] h-full w-full lg:w-1/2 lg:bg-cover lg:bg-center lg:bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('/assets/images/hero_image.webp')",
                    }}
                ></div>

                <section className="flex h-full w-full flex-col justify-center gap-10 px-4 pb-2 lg:w-1/2 lg:px-10 lg:pb-0">
                    <header className="flex w-full flex-col gap-5 lg:w-[400px]">
                        <h1 className="w-min text-wrap text-5xl font-bold text-seventh lg:text-9xl">
                            Control Your Finances
                        </h1>
                        <h3 className="w-min text-nowrap text-3xl font-bold text-fifth lg:mx-2 lg:text-5xl">
                            SMART SAVINGS
                        </h3>
                    </header>
                    <main className="flex w-full flex-col items-center gap-5 lg:max-w-[400px] lg:items-start">
                        <p className="text-base font-semibold text-fifth lg:mx-2 lg:text-lg">
                            Manage your expenses and savings efficiently. Record
                            your income, track your spending, and plan your
                            savings with precision. Analyze your financial
                            history, set goals, and make informed decisions.
                            Simplify your finances and achieve financial
                            stability with ease.
                        </p>
                        <a
                            className="w-min text-nowrap rounded-lg bg-fifth px-3 py-1 text-lg font-semibold text-primary hover:shadow-lg lg:mx-2 lg:px-5 lg:py-2"
                            href={route('login')}
                        >
                            LOGIN
                        </a>
                    </main>
                </section>
                <section className="flex w-full items-center justify-center lg:w-1/2">
                    <img
                        src="/assets/images/chanchito.webp"
                        alt="chanchito"
                        className="w-[72%]"
                        draggable="false"
                    />
                </section>
            </main>
        </>
    );
}
