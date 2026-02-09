import MedicinaList from '@/components/MedicinaList';
import Link from 'next/link';
import { Suspense } from 'react';
import { obtenerMedicinas } from '@/lib/data';

async function MedicinaContainer() {
    const medicinas = await obtenerMedicinas();
    return <MedicinaList medicinas={medicinas} />;
}

export default function PaginaMedicinas() {
    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center mb-12'>
                    <h1 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200'>
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            Medicinas
                        </Link>
                    </h1>
                </div>

                <Suspense fallback={
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
                        <p className="ml-4 text-xl font-medium text-emerald-400">Cargando inventario...</p>
                    </div>
                }>
                    <MedicinaContainer />
                </Suspense>
            </div>
        </div>
    );
}