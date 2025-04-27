export default function HistoryButton({ active, setActive, type }) {
    return (
        <section className="mt-2 flex flex-wrap justify-evenly gap-4 bg-white p-4 dark:bg-gray-200 md:flex-nowrap md:gap-0">
            <button
                onClick={() => setActive(true)}
                className={`rounded px-4 py-2 font-semibold ${
                    active
                        ? 'cursor-no-drop bg-gray-100 text-gray-300 dark:bg-gray-500 dark:text-white'
                        : 'bg-gray-300 text-quaternary dark:bg-gray-800 dark:text-white'
                }`}
                disabled={active}
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
            <button
                onClick={() => setActive(false)}
                className={`rounded px-4 py-2 font-semibold ${
                    !active
                        ? 'cursor-no-drop bg-gray-100 text-gray-300 dark:bg-gray-500 dark:text-white'
                        : 'bg-gray-300 text-quaternary dark:bg-gray-800 dark:text-white'
                }`}
                disabled={!active}
            >
                Recurrent {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
        </section>
    );
}
