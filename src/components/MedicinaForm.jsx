'use client'
import { useActionState, useEffect } from 'react'
import { insertarMedicina, modificarMedicina, eliminarMedicina } from '@/lib/actions'
import { toast } from 'sonner'

export default function MedicinaForm({ medicina, modalRef }) {
    const action = medicina?.id
        ? (medicina.delete ? eliminarMedicina : modificarMedicina)
        : insertarMedicina;

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

    if (medicina?.delete) {
        return (
            <form action={actionFunction} className="p-6">
                <input type="hidden" name="id" value={medicina.id} />
                <p className="text-lg mb-6">¿Estás seguro de que quieres eliminar la medicina <b>{medicina.nombre}</b>?</p>
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
                        {isPending ? 'Eliminando...' : 'Eliminar Medicina'}
                    </button>
                </div>
            </form>
        );
    }

    return (
        <form action={actionFunction} className="flex flex-col gap-6 p-6">
            <input type="hidden" name="id" defaultValue={medicina?.id} />

            <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="font-bold text-gray-700 dark:text-gray-200">Nombre de la Medicina</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    defaultValue={medicina?.nombre}
                    placeholder="Ej. Paracetamol"
                    required
                    className="p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="via" className="font-bold text-gray-700 dark:text-gray-200">Vía de Administración</label>
                <select
                    name="via"
                    id="via"
                    defaultValue={medicina?.via || "Oral"}
                    required
                    className="p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="Oral">Oral</option>
                    <option value="Intravenosa">Intravenosa</option>
                    <option value="Dérmica">Dérmica</option>
                    <option value="Sublingual">Sublingual</option>
                    <option value="Inhalada">Inhalada</option>
                </select>
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
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                    {isPending ? 'Guardando...' : (medicina?.id ? 'Actualizar Medicina' : 'Registrar Medicina')}
                </button>
            </div>
        </form>
    );
}
