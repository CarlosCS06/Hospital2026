import PacienteList from '@/components/PacienteList';
import Link from 'next/link';
import { Suspense } from 'react';
import { obtenerPacientes, obtenerPlantasIdNombre, obtenerMedicinasIdNombre } from '@/lib/data';

async function PacienteContainer() {
    const pacientes = await obtenerPacientes();
    const plantas = await obtenerPlantasIdNombre();
    const medicinas = await obtenerMedicinasIdNombre();

    return <PacienteList pacientes={pacientes} plantas={plantas} medicinas={medicinas} />;
}

export default function PaginaPacientes() {
    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center mb-12'>
                    <h1 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-900 dark:from-amber-400 dark:to-amber-200'>
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            Pacientes
                        </Link>
                    </h1>
                </div>

                <Suspense fallback={
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
                        <p className="ml-4 text-xl font-medium text-amber-400">Cargando historiales...</p>
                    </div>
                }>
                    <PacienteContainer />
                </Suspense>
            </div>
        </div>
    );
}
