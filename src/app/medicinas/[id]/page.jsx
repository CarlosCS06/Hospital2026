import { obtenerMedicina } from "@/lib/data";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";

async function MedicinaDetalle({ id }) {
    const medicina = await obtenerMedicina(id);
    if (!medicina) notFound();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-emerald-50 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{medicina.nombre}</h2>
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-lg text-sm font-bold uppercase mb-8">
                Administración: {medicina.via}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-wider">Pacientes Prescritos</h3>
                {medicina.pacientes.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {medicina.pacientes.map((p) => (
                            <li key={p.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 flex items-center">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                <span className="text-gray-800 dark:text-gray-200 font-medium">{p.nombre}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 italic">No hay pacientes con esta medicina prescrita.</p>
                )}
            </div>
        </div>
    );
}

export default async function PaginaMedicina({ params }) {
    const { id } = await params;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/medicinas" className="inline-flex items-center text-emerald-500 hover:text-emerald-600 mb-8 font-medium transition-colors">
                    <span className="mr-2">←</span> Volver a Medicinas
                </Link>

                <Suspense fallback={
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 flex flex-col items-center border border-emerald-50 dark:border-gray-700">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
                        <p className="text-emerald-400 font-medium">Cargando detalles de medicina...</p>
                    </div>
                }>
                    <MedicinaDetalle id={id} />
                </Suspense>
            </div>
        </div>
    );
}
