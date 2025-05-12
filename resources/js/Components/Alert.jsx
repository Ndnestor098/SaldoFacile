import { useState } from 'react';

export default function Alert() {
    const [alert, setAlert] = useState(() => {
        const stored = sessionStorage.getItem('alert');
        if (stored) {
            const elapsed = Date.now() - Number(stored);
            // 5 minutos = 300,000 ms
            if (elapsed < 300000) {
                return true; // sigue activa
            } else {
                sessionStorage.removeItem('alert'); // expiró
            }
        }
        return false; // no existe o expiró
    });

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
                alert && 'hidden'
            }`}
        >
            <div className="mx-1 flex w-full max-w-2xl flex-col gap-3 rounded-xl bg-white p-5 shadow-lg">
                <div className="flex flex-col justify-center gap-3">
                    <p className="mt-1.5 text-ellipsis text-xl font-bold leading-8 text-[#9EC6F3]">
                        Important Notice About This Version!
                    </p>
                    <p className="text-zinc-40 leading-5">
                        You are using a beta version of this platform. Feel free
                        to explore and use all its features. If you encounter
                        any errors or have suggestions, don’t hesitate to
                        contact us at
                        <a
                            href="mailto:trabajo.nestor.098@gmail.com"
                            className="font-semibold text-blue-500 underline"
                        >
                            {' '}
                            trabajo.nestor.098@gmail.com{' '}
                        </a>
                        or send us a direct message on Instagram: @catmaster.
                        Thank you for supporting the development!
                    </p>
                    <button
                        className="w-full cursor-pointer rounded-lg border-b-[4px] border-blue-600 bg-blue-500 py-2 text-white transition-all hover:-translate-y-[1px] hover:border-b-[6px] hover:brightness-110 active:translate-y-[2px] active:border-b-[2px] active:brightness-90"
                        onClick={() => {
                            setAlert(true);
                            sessionStorage.setItem('alert', Date.now());
                        }}
                    >
                        Button
                    </button>
                </div>
            </div>
        </div>
    );
}
