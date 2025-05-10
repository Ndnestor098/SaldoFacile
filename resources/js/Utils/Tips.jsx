import { DynamicIcon } from 'lucide-react/dynamic';
import { useState } from 'react';

export default function Tips({ tipKey }) {
    const [active, setActive] = useState(null);

    let title = '';
    let text = '';

    switch (tipKey) {
        case 'Deficit + Active Debt':
            title = 'Deficit + Active Debt – Emergency Plan';
            text =
                'Your expenses exceed your income while you have ongoing debt. Prioritize paying off the highest-interest debt first (it’s costing you the most). Consider debt consolidation to merge payments into a single, lower-interest installment. Stop taking on new debt until you stabilize your cash flow.';
            break;
        case 'Deficit + Active Mortgage':
            title = 'Deficit + Active Mortgage – Time to Adjust';
            text =
                'You’re spending more than you earn and have a mortgage. Consider refinancing to reduce monthly payments. Cut down on non-essential expenses and explore renting out a room or space to generate extra income.';
            break;
        case 'Deficit + Subscriptions Active':
            title = 'Deficit + Active Subscriptions – Cut Unused Services';
            text =
                'You’re in deficit while paying for subscriptions. Review which services you can pause or cancel (Netflix, Spotify, etc.) until you regain financial stability.';
            break;
        case 'Deficit + Memberships Active':
            title = 'Deficit + Active Memberships – Pause Luxuries';
            text =
                'Your budget is negative while holding memberships (gym, clubs). If possible, pause or cancel memberships temporarily to redirect funds toward essential expenses.';
            break;
        case 'Deficit + No Recurrent Income':
            title = 'Deficit + No Recurrent Income – Build Income Streams';
            text =
                'You’re in deficit and lack recurring income. Focus on securing steady income sources, such as part-time jobs, freelance gigs, or selling unused items, to cover recurring expenses.';
            break;
        case 'Surplus + Recurrent Income':
            title = 'Surplus + Recurrent Income – Start Saving Now';
            text =
                'You’re earning more than you spend with steady income. Great! Allocate at least 20% of your earnings to savings or an emergency fund to secure your financial future.';
            break;
        case 'Surplus + No Debt':
            title = 'Surplus + No Debt – Invest for Growth';
            text =
                'Your finances are healthy with no debt. This is an ideal time to start investing—consider index funds, government bonds, or property investments to grow your wealth long-term.';
            break;
        case 'Surplus + Active Mortgage':
            title = 'Surplus + Active Mortgage – Pay Down Faster';
            text =
                'You’re in surplus and have a mortgage. Use your extra income to make additional payments toward your mortgage principal to save on interest over time.';
            break;
        case 'Surplus + Multiple Incomes':
            title = 'Surplus + Multiple Incomes – Diversify & Expand';
            text =
                'With multiple income streams and surplus cash, it’s a great time to diversify further. Explore online courses, digital products, or rental properties to expand your income sources.';
            break;
        case 'Surplus + High Fixed Expenses':
            title = 'Surplus + High Fixed Expenses – Optimize Your Budget';
            text =
                'Although you’re in surplus, your fixed expenses are high. Review and optimize regular expenses like subscriptions or memberships to increase your savings margin even more.';
            break;
        default:
            return;
    }

    return (
        <div className="flex w-full flex-col items-start justify-center gap-1 bg-white p-6 shadow-sm dark:bg-gray-200">
            <button
                onClick={() => setActive(active === 0 ? null : 0)}
                className="flex items-center gap-3 text-xl font-bold"
            >
                {title}
                <DynamicIcon
                    name={active === 0 ? 'chevron-down' : 'chevron-right'}
                    className="size-4"
                />
            </button>
            <p className={`mt-2 ${active === 0 ? 'active' : 'hidden'}`}>
                {text}
            </p>
        </div>
    );
}
