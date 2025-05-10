import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Tips from '@/Utils/Tips';
import { Head } from '@inertiajs/react';

export default function Advice({ data }) {
    let incomesAmount = data.incomes.reduce(
        (total, item) => total + Number(item.amount),
        0,
    );

    let recurrentIncomesAmount = data.recurrent_incomes.reduce(
        (total, item) => total + Number(item.amount),
        0,
    );

    let recurrentExpensesAmount = data.recurrent_expenses.reduce(
        (total, item) => total + Number(item.amount),
        0,
    );

    let isThereDebts = data.recurrent_expenses.filter((item) => {
        return item.category.name === 'Debt Payments';
    });

    let isThereMortgage = data.recurrent_expenses.filter((item) => {
        return item.category.name === 'Mortgage';
    });

    let isThereSubscriptions = data.recurrent_expenses.filter((item) => {
        return item.category.name === 'Subscriptions (Netflix, Spotify)';
    });

    let isThereMemberships = data.recurrent_expenses.filter((item) => {
        return item.category.name === 'Memberships (Gym, Clubs)';
    });

    const balance = data.summary.net_balance;

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

                <section className="relative mt-2 flex flex-col flex-wrap justify-center gap-2 sm:flex-nowrap">
                    {isThereDebts.length > 0 && balance < 0 && (
                        <Tips tipKey="Deficit + Active Debt" />
                    )}

                    {isThereMortgage.length > 0 && balance < 0 && (
                        <Tips tipKey="Deficit + Active Mortgage" />
                    )}

                    {isThereSubscriptions.length > 0 && balance < 0 && (
                        <Tips tipKey="Deficit + Subscriptions Active" />
                    )}

                    {isThereMemberships.length > 0 && balance < 0 && (
                        <Tips tipKey="Deficit + Memberships Active" />
                    )}

                    {recurrentIncomesAmount === 0 && balance < 0 && (
                        <Tips tipKey="Deficit + No Recurrent Income" />
                    )}

                    {recurrentIncomesAmount > 0 && balance >= 0 && (
                        <Tips tipKey="Surplus + Recurrent Income" />
                    )}

                    {isThereDebts.length === 0 &&
                        isThereMortgage.length === 0 &&
                        balance >= 0 && <Tips tipKey="Surplus + No Debt" />}

                    {isThereMortgage.length > 0 && balance >= 0 && (
                        <Tips tipKey="Surplus + Active Mortgage" />
                    )}

                    {data.recurrent_incomes.length > 1 && balance >= 0 && (
                        <Tips tipKey="Surplus + Multiple Incomes" />
                    )}

                    {recurrentExpensesAmount > incomesAmount * 0.5 &&
                        balance >= 0 && (
                            <Tips tipKey="Surplus + High Fixed Expenses" />
                        )}
                </section>
            </AuthenticatedLayout>
        </>
    );
}
