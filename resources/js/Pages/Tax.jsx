import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Info } from 'lucide-react';

export default function Mortgage({
    gross_income,
    irpef,
    regional_tax,
    deductions,
    total_tax,
    worker_type,
    dependents,
    region,
}) {
    const queryParams = new URLSearchParams(window.location.search);

    const { data, setData, get, reset, errors } = useForm({
        worker_type: queryParams.get('worker_type') || '', // Tipo de trabajador (empleado, autónomo, forfettario)
        gross_income: queryParams.get('gross_income') || '', // Ingreso bruto anual
        region: queryParams.get('region') || '', // Región de residencia
        dependents: queryParams.get('dependents') || '', // Número de hijos a cargo
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        get(route('tools.tax'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    console.log(total_tax);

    return (
        <>
            <Head title="Taxes" />
            <AuthenticatedLayout>
                <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <div className="flex w-full flex-col items-center gap-2 bg-white p-4 dark:bg-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Income Tax Calculator (Italy)
                        </h2>
                        <form
                            className="flex w-full max-w-[600px] flex-col gap-3"
                            onSubmit={handleSubmit}
                        >
                            <label className="flex w-full flex-col gap-1">
                                <span className="relative flex flex-wrap items-center gap-2">
                                    Worker Type
                                    <div className="group relative">
                                        <Info className="w-4 cursor-pointer" />
                                        <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                            <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                            Select your job type. It affects how
                                            your taxes are calculated.
                                        </span>
                                    </div>
                                </span>
                                <select
                                    className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                    name="worker_type"
                                    value={data.worker_type}
                                    onChange={(e) =>
                                        setData('worker_type', e.target.value)
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        -- Seleziona --
                                    </option>
                                    <option value="employee">Employee</option>
                                    <option value="autonomous">
                                        Self-Employed (with VAT number)
                                    </option>
                                    <option value="forfettario">
                                        Flat-Rate Scheme
                                    </option>
                                </select>
                                {errors.worker_type && (
                                    <span className="text-sm text-red_primary">
                                        {errors.worker_type}
                                    </span>
                                )}
                            </label>

                            <label className="flex w-full flex-col gap-1">
                                <span className="relative flex flex-wrap items-center gap-2">
                                    Annual Gross Income (€)
                                    <div className="group relative">
                                        <Info className="w-4 cursor-pointer" />
                                        <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                            <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                            Total income before taxes or
                                            deductions.
                                        </span>
                                    </div>
                                </span>
                                <input
                                    type="number"
                                    name="gross_income"
                                    className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                    placeholder="e.g. 35000"
                                    value={data.gross_income}
                                    onChange={(e) =>
                                        setData('gross_income', e.target.value)
                                    }
                                    required
                                />
                                {errors.gross_income && (
                                    <span className="text-sm text-red_primary">
                                        {errors.gross_income}
                                    </span>
                                )}
                            </label>

                            <label className="flex w-full flex-col gap-1">
                                <span className="relative flex flex-wrap items-center gap-2">
                                    Region of Residence
                                    <div className="group relative">
                                        <Info className="w-4 cursor-pointer" />
                                        <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                            <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                            Select your current official region
                                            of residence.
                                        </span>
                                    </div>
                                </span>
                                <select
                                    name="region"
                                    className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                    value={data.region}
                                    onChange={(e) =>
                                        setData('region', e.target.value)
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        -- Select a Region --
                                    </option>
                                    <option value="Abruzzo">Abruzzo</option>
                                    <option value="Basilicata">
                                        Basilicata
                                    </option>
                                    <option value="Calabria">Calabria</option>
                                    <option value="Campania">Campania</option>
                                    <option value="Emilia-Romagna">
                                        Emilia-Romagna
                                    </option>
                                    <option value="Friuli Venezia Giulia">
                                        Friuli Venezia Giulia
                                    </option>
                                    <option value="Lazio">Lazio</option>
                                    <option value="Liguria">Liguria</option>
                                    <option value="Lombardia">Lombardia</option>
                                    <option value="Marche">Marche</option>
                                    <option value="Molise">Molise</option>
                                    <option value="Piemonte">Piemonte</option>
                                    <option value="Puglia">Puglia</option>
                                    <option value="Sardegna">Sardegna</option>
                                    <option value="Sicilia">Sicilia</option>
                                    <option value="Toscana">Toscana</option>
                                    <option value="Trentino-Alto Adige">
                                        Trentino-Alto Adige
                                    </option>
                                    <option value="Umbria">Umbria</option>
                                    <option value="Valle d'Aosta">
                                        Valle d'Aosta
                                    </option>
                                    <option value="Veneto">Veneto</option>
                                </select>
                                {errors.region && (
                                    <span className="text-sm text-red_primary">
                                        {errors.region}
                                    </span>
                                )}
                            </label>

                            <label className="flex w-full flex-col gap-1">
                                <span className="relative flex flex-wrap items-center gap-2">
                                    Number of Children in Carico
                                    <div className="group relative">
                                        <Info className="w-4 cursor-pointer" />
                                        <span className="absolute left-1/2 top-0 z-10 mt-6 hidden w-64 max-w-xs -translate-x-1/2 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block sm:left-3 sm:translate-x-0">
                                            <span className="absolute left-1/2 top-[-8px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-700 sm:left-0 sm:top-[-4px] sm:translate-x-0 sm:border-x-0 sm:border-y-8 sm:border-b-0 sm:border-l-8 sm:border-y-transparent sm:border-l-gray-700"></span>
                                            May reduce taxes through family
                                            deductions.
                                        </span>
                                    </div>
                                </span>
                                <input
                                    type="number"
                                    name="dependents"
                                    className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                    placeholder="e.g. 2"
                                    value={data.dependents}
                                    onChange={(e) =>
                                        setData('dependents', e.target.value)
                                    }
                                />
                                {errors.dependents && (
                                    <span className="text-sm text-red_primary">
                                        {errors.dependents}
                                    </span>
                                )}
                            </label>

                            <button
                                type="submit"
                                className="rounded bg-gray-300 px-4 py-2 font-semibold text-quaternary hover:bg-gray-800 hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-300 dark:hover:text-quaternary"
                            >
                                Calculate Taxes
                            </button>
                        </form>
                    </div>
                </section>

                {total_tax && irpef && (
                    <section className="relative mt-2 flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                        <div className="flex w-full flex-col gap-4 bg-white p-4 shadow-md dark:bg-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Italian Income Tax Summary
                            </h2>
                            <ul className="space-y-1 text-gray-700">
                                <li>
                                    <strong>Worker Type:</strong> {worker_type}
                                </li>
                                <li>
                                    <strong>Gross Income:</strong> €
                                    {gross_income}
                                </li>
                                <li>
                                    <strong>Region:</strong> {region}
                                </li>
                                <li>
                                    <strong>Dependents:</strong> {dependents}
                                </li>
                                <li>
                                    <strong>Deductions:</strong> €{deductions}
                                </li>
                                <li>
                                    <strong>IRPEF Tax:</strong> €{irpef}
                                </li>
                                <li>
                                    <strong>Regional Tax:</strong> €
                                    {regional_tax}
                                </li>
                                <li className="border-b border-t border-gray-400 py-2 font-semibold">
                                    <strong>Total Tax Payable:</strong> €
                                    {total_tax}
                                </li>
                            </ul>
                        </div>
                    </section>
                )}
            </AuthenticatedLayout>
        </>
    );
}
