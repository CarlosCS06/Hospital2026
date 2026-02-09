import PlantaList from '@/components/PlantaList';
import Link from 'next/link';
import { Suspense } from 'react';
import { obtenerPlantas } from '@/lib/data';

async function PlantaContainer() {
    const plantas = await obtenerPlantas();
    return <PlantaList plantas={plantas} />;
}

export default function PaginaPlantas() {
    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center mb-12'>
                    <h1 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-900 dark:from-indigo-400 dark:to-indigo-200'>
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            Plantas
                        </Link>
                    </h1>
                </div>

                <Suspense fallback={
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
                        <p className="ml-4 text-xl font-medium text-indigo-400">Cargando instalaciones...</p>
                    </div>
                }>
                    <PlantaContainer />
                </Suspense>
            </div>
        </div>
    );
}
