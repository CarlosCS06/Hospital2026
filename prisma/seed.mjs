import plantas from './data/plantas.json' with { type: 'json' };
import pacientes from './data/pacientes.json' with { type: 'json' };
import medicinas from './data/medicinas.json' with { type: 'json' };

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Limpiando base de datos...")

    // Si estás usando MariaDB/MySQL (según el error anterior)
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE `Planta`;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE `Paciente`;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE `Medicina`;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE `_MedicinaToPaciente`;');
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;');

    console.log("Añadiendo plantas...")
    await prisma.planta.createMany({
        data: plantas,
        skipDuplicates: true,
    });

    console.log("Añadiendo pacientes...")
    await prisma.paciente.createMany({
        data: pacientes,
        skipDuplicates: true,
    });

    console.log("Añadiendo medicinas...")
    await prisma.medicina.createMany({
        data: medicinas,
        skipDuplicates: true,
    });

    console.log("Listo!")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
