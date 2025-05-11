import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <header className="relative z-20 flex items-center justify-between px-10 py-5">
                <div className="flex flex-col items-center justify-center gap-1">
                    <img
                        src="/assets/images/pig.webp"
                        alt="Logo"
                        className="w-12"
                        draggable="false"
                    />
                    <span className="font-bold text-seventh">SaldoFacile</span>
                </div>
                <nav>
                    <ul className="flex gap-5">
                        <li>
                            <Link
                                className="rounded-lg bg-tertiary px-5 py-2 font-bold text-quaternary"
                                href={route('login')}
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="rounded-lg bg-tertiary px-5 py-2 font-bold text-quaternary"
                                href={route('register')}
                            >
                                Register
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="flex h-full w-full items-center justify-around">
                <div
                    className="absolute left-0 top-0 z-[-10] h-screen w-1/2 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('/assets/images/hero_image.webp')",
                    }}
                ></div>

                <section className="flex h-full w-1/2 flex-col justify-center gap-10 px-10">
                    <header className="flex w-[400px] flex-col gap-5">
                        <h1 className="w-min text-wrap text-9xl font-bold text-seventh">
                            Control Your Finances
                        </h1>
                        <h3 className="mx-2 w-min text-nowrap text-5xl font-bold text-fifth">
                            SMART SAVINGS
                        </h3>
                    </header>
                    <main className="flex w-[400px] flex-col gap-5">
                        <p className="mx-2 text-lg font-semibold text-fifth">
                            Manage your expenses and savings efficiently. Record
                            your income, track your spending, and plan your
                            savings with precision. Analyze your financial
                            history, set goals, and make informed decisions.
                            Simplify your finances and achieve financial
                            stability with ease.
                        </p>
                        <a
                            className="mx-2 w-min text-nowrap rounded-lg bg-fifth px-5 py-2 text-lg font-semibold text-primary hover:shadow-lg"
                            href={route('login')}
                        >
                            LOGIN
                        </a>
                    </main>
                </section>
                <section className="flex w-1/2 items-center justify-center">
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
