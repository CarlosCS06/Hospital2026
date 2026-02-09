'use client'
import { useActionState, useEffect } from 'react'
import { insertarPaciente, modificarPaciente, eliminarPaciente } from '@/lib/actions'
import { toast } from 'sonner'

export default function PacienteForm({ paciente, plantas, medicinas, modalRef }) {
    const action = paciente?.id
        ? (paciente.delete ? eliminarPaciente : modificarPaciente)
        : insertarPaciente;

    const [state, actionFunction, isPending] = useActionState(action, {});

    useEffect(() => {
        if (state.success) {
            toast.success(state.success);
            modalRef?.current?.close();
        }
        if (state.error) {
            toast.error(state.error);
        }
    }, [state, modalRef]);

    if (paciente?.delete) {
        return (
            <form action={actionFunction} className="p-6">
                <input type="hidden" name="id" value={paciente.id} />
                <p className="text-lg mb-6">¿Estás seguro de que quieres eliminar el historial de <b>{paciente.nombre}</b>?</p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => modalRef?.current?.close()}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        disabled={isPending}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {isPending ? 'Eliminando...' : 'Eliminar Registro'}
                    </button>
                </div>
            </form>
        );
    }

    return (
        <form action={actionFunction} className="flex flex-col gap-6 p-6 max-h-[80vh] overflow-y-auto">
            <input type="hidden" name="id" defaultValue={paciente?.id} />

            <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="font-bold text-gray-700 dark:text-gray-200">Nombre del Paciente</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    defaultValue={paciente?.nombre}
                    placeholder="Nombre completo"
                    required
                    className="p-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="fecha_nacimiento" className="font-bold text-gray-700 dark:text-gray-200">Fecha de Nacimiento</label>
                <input
                    type="date"
                    name="fecha_nacimiento"
                    id="fecha_nacimiento"
                    defaultValue={paciente?.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).toISOString().split('T')[0] : ""}
                    required
                    className="p-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="plantaId" className="font-bold text-gray-700 dark:text-gray-200">Planta de Ingreso</label>
                <select
                    name="plantaId"
                    id="plantaId"
                    defaultValue={paciente?.plantaId || ""}
                    className="p-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="">-- No asignada --</option>
                    {plantas?.map(planta => (
                        <option key={planta.id} value={planta.id}>{planta.nombre}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <span className="font-bold text-gray-700 dark:text-gray-200">Medicinas Prescritas</span>
                <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    {medicinas?.map(medicina => (
                        <label key={medicina.id} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                name={`medicina_${medicina.id}`}
                                defaultChecked={paciente?.medicinas?.some(m => m.id === medicina.id)}
                                className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-amber-600 transition-colors">{medicina.nombre}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button
                    type="button"
                    onClick={() => modalRef?.current?.close()}
                    className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    disabled={isPending}
                    className="px-6 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                    {isPending ? 'Guardando...' : (paciente?.id ? 'Actualizar Paciente' : 'Registrar Paciente')}
                </button>
            </div>
        </form>
    );
}
