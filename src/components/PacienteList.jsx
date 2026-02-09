'use client'
import { useRef, useState } from 'react';
import Modal from './modal';
import PacienteForm from './PacienteForm';
import Link from 'next/link';

export default function PacienteList({ pacientes, plantas, medicinas }) {
    const modalRef = useRef();
    const [selectedPaciente, setSelectedPaciente] = useState(null);

    const openModal = (paciente = null, isDelete = false) => {
        setSelectedPaciente(paciente ? { ...paciente, delete: isDelete } : null);
        modalRef.current.open();
    };

    return (
        <>
            <div className='mb-8 flex justify-end'>
                <button
                    onClick={() => openModal()}
                    className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl shadow-lg hover:bg-amber-700 transition-all transform hover:-translate-y-1"
                >
                    + Registrar Paciente
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pacientes.map((paciente) => (
                    <div key={paciente.id} className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 relative">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openModal(paciente)}
                                className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                            >
                                ✎
                            </button>
                            <button
                                onClick={() => openModal(paciente, true)}
                                className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/50 transition-colors"
                            >
                                🗑
                            </button>
                        </div>

                        <Link href={`/pacientes/${paciente.id}`}>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer">{paciente.nombre}</h2>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">
                            <span className="text-amber-600 dark:text-amber-400">Planta:</span> {paciente.planta?.nombre || 'Pendiente'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Nacido el: {new Date(paciente.fecha_nacimiento).toLocaleDateString()}
                        </p>

                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Medicación:</p>
                            {paciente.medicinas.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {paciente.medicinas.map((m) => (
                                        <span key={m.id} className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-200 dark:border-emerald-800">
                                            {m.nombre}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm italic text-gray-400">Sin medicación</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Modal ref={modalRef} title={selectedPaciente?.delete ? "Eliminar Paciente" : (selectedPaciente ? "Editar Paciente" : "Nuevo Paciente")}>
                <PacienteForm
                    key={selectedPaciente?.id || 'new'}
                    paciente={selectedPaciente}
                    plantas={plantas}
                    medicinas={medicinas}
                    modalRef={modalRef}
                />
            </Modal>
        </>
    );
}
