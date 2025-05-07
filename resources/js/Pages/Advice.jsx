import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useState } from 'react';

export default function Advice() {
    const [active, setActive] = useState(null);
    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout>
                <section className="relative flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="flex flex-col items-center justify-center gap-1 bg-white p-6 shadow-sm dark:bg-gray-200">
                        <h1 className="text-2xl font-bold">Advice</h1>
                        <p className="mt-2 px-3">
                            By analyzing your financial data, we’ve identified
                            key opportunities to optimize your money. In this
                            section, you’ll find personalized recommendations
                            based on your income, expenses, and saving habits.
                            Our goal is to help you make smarter decisions,
                            maximize your resources, and achieve your financial
                            goals with greater clarity. Explore these tips and
                            discover how to improve your financial
                            well-being—one step at a time!
                        </p>
                    </div>
                </section>

                <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="flex w-full flex-col items-start justify-center gap-1 bg-white p-6 shadow-sm dark:bg-gray-200">
                        <button
                            onClick={() => setActive(active === 0 ? null : 0)}
                            className="flex items-center gap-3 text-xl font-bold"
                        >
                            Analisis 1
                            <DynamicIcon
                                name={
                                    active === 0
                                        ? 'chevron-down'
                                        : 'chevron-right'
                                }
                                className="size-4"
                            />
                        </button>
                        <p
                            className={`mt-2 ${
                                active === 0 ? 'active' : 'hidden'
                            }`}
                        >
                            By analyzing your financial data, we’ve identified
                            key opportunities to optimize your money. In this
                            section, you’ll find personalized recommendations
                            based on your income, expenses, and saving habits.
                            Our goal is to help you make smarter decisions,
                            maximize your resources, and achieve your financial
                            goals with greater clarity. Explore these tips and
                            discover how to improve your financial
                            well-being—one step at a time!
                        </p>
                    </div>
                </section>
            </AuthenticatedLayout>
        </>
    );
}
