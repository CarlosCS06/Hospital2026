import { obtenerPlanta } from "@/lib/data";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";

async function PlantaDetalle({ id }) {
    const planta = await obtenerPlanta(id);
    if (!planta) notFound();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-indigo-50 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{planta.nombre}</h2>
            <p className="text-xl text-indigo-600 dark:text-indigo-400 mb-8 font-medium">Jefe de Planta: {planta.jefe_planta}</p>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-wider">Historial de Pacientes en Planta</h3>
                {planta.pacientes.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Nombre</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Fecha Nacimiento</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {planta.pacientes.map((p) => (
                                    <tr key={p.id}>
                                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{p.id}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">{p.nombre}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{new Date(p.fecha_nacimiento).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400 italic">No hay registros de pacientes en esta planta.</p>
                )}
            </div>
        </div>
    );
}

export default async function PaginaPlanta({ params }) {
    const { id } = await params;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/plantas" className="inline-flex items-center text-indigo-500 hover:text-indigo-600 mb-8 font-medium transition-colors">
                    <span className="mr-2">←</span> Volver a Plantas
                </Link>

                <Suspense fallback={
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 flex flex-col items-center border border-indigo-50 dark:border-gray-700">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                        <p className="text-indigo-400 font-medium">Cargando detalles de la planta...</p>
                    </div>
                }>
                    <PlantaDetalle id={id} />
                </Suspense>
            </div>
        </div>
    );
}
