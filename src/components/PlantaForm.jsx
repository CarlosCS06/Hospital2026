'use client'
import { useActionState, useEffect } from 'react'
import { insertarPlanta, modificarPlanta, eliminarPlanta } from '@/lib/actions'
import { toast } from 'sonner'

export default function PlantaForm({ planta, modalRef }) {
    const action = planta?.id
        ? (planta.delete ? eliminarPlanta : modificarPlanta)
        : insertarPlanta;

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

    if (planta?.delete) {
        return (
            <form action={actionFunction} className="p-6">
                <input type="hidden" name="id" value={planta.id} />
                <p className="text-lg mb-6">¿Estás seguro de que quieres eliminar la planta <b>{planta.nombre}</b>?</p>
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
                        {isPending ? 'Eliminando...' : 'Eliminar Planta'}
                    </button>
                </div>
            </form>
        );
    }

    return (
        <form action={actionFunction} className="flex flex-col gap-6 p-6">
            <input type="hidden" name="id" defaultValue={planta?.id} />

            <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="font-bold text-gray-700 dark:text-gray-200">Nombre de la Planta</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    defaultValue={planta?.nombre}
                    placeholder="Ej. Traumatología"
                    required
                    className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="jefe_planta" className="font-bold text-gray-700 dark:text-gray-200">Jefe de Planta</label>
                <input
                    type="text"
                    name="jefe_planta"
                    id="jefe_planta"
                    defaultValue={planta?.jefe_planta}
                    placeholder="Nombre del doctor responsable"
                    required
                    className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-gray-700 dark:border-gray-600"
                />
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
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                    {isPending ? 'Guardando...' : (planta?.id ? 'Actualizar Planta' : 'Registrar Planta')}
                </button>
            </div>
        </form>
    );
}
