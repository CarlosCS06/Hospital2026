'use client'
import { useRef, useState } from 'react';
import Modal from './modal';
import PlantaForm from './PlantaForm';
import Link from 'next/link';

export default function PlantaList({ plantas }) {
    const modalRef = useRef();
    const [selectedPlanta, setSelectedPlanta] = useState(null);

    const openModal = (planta = null, isDelete = false) => {
        setSelectedPlanta(planta ? { ...planta, delete: isDelete } : null);
        modalRef.current.open();
    };

    return (
        <>
            <div className='mb-8 flex justify-end'>
                <button
                    onClick={() => openModal()}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1"
                >
                    + Registrar Planta
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plantas.map((planta) => (
                    <div key={planta.id} className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 relative">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openModal(planta)}
                                className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                                title="Editar"
                            >
                                ✎
                            </button>
                            <button
                                onClick={() => openModal(planta, true)}
                                className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/50 transition-colors"
                                title="Eliminar"
                            >
                                🗑
                            </button>
                        </div>

                        <Link href={`/plantas/${planta.id}`}>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">{planta.nombre}</h2>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Jefe:</span> {planta.jefe_planta}
                        </p>

                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Pacientes en planta:</p>
                            {planta.pacientes.length > 0 ? (
                                <ul className="space-y-1">
                                    {planta.pacientes.map((p) => (
                                        <li key={p.id} className="text-gray-700 dark:text-gray-200 text-sm flex items-center">
                                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                                            {p.nombre}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm italic text-gray-400">Sin pacientes</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Modal ref={modalRef} title={selectedPlanta?.delete ? "Eliminar Planta" : (selectedPlanta ? "Editar Planta" : "Nueva Planta")}>
                <PlantaForm key={selectedPlanta?.id || 'new'} planta={selectedPlanta} modalRef={modalRef} />
            </Modal>
        </>
    );
}
