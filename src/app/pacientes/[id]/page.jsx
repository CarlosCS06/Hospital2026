import { obtenerPaciente } from "@/lib/data";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";

async function PacienteDetalle({ id }) {
    const paciente = await obtenerPaciente(id);
    if (!paciente) notFound();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-amber-50 dark:border-gray-700 text-gray-800 dark:text-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-1">{paciente.nombre}</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Expediente ID: #{paciente.id}</p>
                </div>
                <div className="px-6 py-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800">
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">Ubicación</p>
                    <p className="text-xl font-bold text-amber-800 dark:text-amber-200">{paciente.planta?.nombre || 'Pendiente de Ingreso'}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Datos Personales</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-200">
                        <span className="font-semibold">Nacimiento:</span> {new Date(paciente.fecha_nacimiento).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Tratamiento Actual</h3>
                {paciente.medicinas.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paciente.medicinas.map((m) => (
                            <div key={m.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-emerald-100 dark:border-emerald-900 shadow-sm flex items-center justify-between">
                                <span className="text-emerald-800 dark:text-emerald-200 font-bold">{m.nombre}</span>
                                <span className="text-xs bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 px-2 py-1 rounded-md font-medium">{m.via}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-gray-50 dark:bg-gray-700/20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600">
                        <p className="text-gray-400 italic">No hay medicación prescrita actualmente.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default async function PaginaPaciente({ params }) {
    const { id } = await params;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/pacientes" className="inline-flex items-center text-amber-500 hover:text-amber-600 mb-8 font-medium transition-colors">
                    <span className="mr-2">←</span> Volver a Pacientes
                </Link>

                <Suspense fallback={
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 flex flex-col items-center border border-amber-50 dark:border-gray-700">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
                        <p className="text-amber-400 font-medium">Recuperando historial médico...</p>
                    </div>
                }>
                    <PacienteDetalle id={id} />
                </Suspense>
            </div>
        </div>
    );
}
