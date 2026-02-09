'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


// ------------------------------ PLANTAS ------------------------------

export async function insertarPlanta(prevState, formData) {
    const nombre = formData.get('nombre')
    const jefe_planta = formData.get('jefe_planta')

    try {
        await prisma.planta.create({
            data: {
                nombre,
                jefe_planta
            }
        })
        revalidatePath('/plantas')
        return { success: 'Planta registrada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function modificarPlanta(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const jefe_planta = formData.get('jefe_planta')

    try {
        await prisma.planta.update({
            where: { id },
            data: {
                nombre,
                jefe_planta
            }
        })
        revalidatePath('/plantas')
        return { success: 'Planta modificada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function eliminarPlanta(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.planta.delete({
            where: { id },
        })
        revalidatePath('/plantas')
        return { success: 'Planta eliminada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}


// ------------------------------ MEDICINAS ------------------------------

export async function insertarMedicina(prevState, formData) {
    const nombre = formData.get('nombre')
    const via = formData.get('via')

    try {
        await prisma.medicina.create({
            data: {
                nombre,
                via
            }
        })
        revalidatePath('/medicinas')
        return { success: 'Medicina registrada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function modificarMedicina(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const via = formData.get('via')

    try {
        await prisma.medicina.update({
            where: { id },
            data: {
                nombre,
                via
            }
        })
        revalidatePath('/medicinas')
        return { success: 'Medicina modificada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function eliminarMedicina(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.medicina.delete({
            where: { id },
        })
        revalidatePath('/medicinas')
        return { success: 'Medicina eliminada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}


// ------------------------------ PACIENTES ------------------------------

export async function insertarPaciente(prevState, formData) {
    const nombre = formData.get('nombre')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const plantaId = formData.get('plantaId') ? Number(formData.get('plantaId')) : null

    // N:M Medicinas
    const medicinasIDs = await prisma.medicina.findMany({
        select: { id: true }
    })
    const connect = medicinasIDs.filter(m => formData.get(`medicina_${m.id}`) !== null).map(m => ({ id: m.id }))
    const medicinas = { connect }

    try {
        await prisma.paciente.create({
            data: {
                nombre,
                fecha_nacimiento,
                plantaId,
                medicinas
            }
        })
        revalidatePath('/pacientes')
        return { success: 'Paciente registrado con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function modificarPaciente(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const plantaId = formData.get('plantaId') ? Number(formData.get('plantaId')) : null

    // N:M Medicinas update
    const medicinasIDs = await prisma.medicina.findMany({
        select: { id: true }
    })
    const connect = medicinasIDs.filter(m => formData.get(`medicina_${m.id}`) !== null).map(m => ({ id: m.id }))
    const disconnect = medicinasIDs.filter(m => formData.get(`medicina_${m.id}`) === null).map(m => ({ id: m.id }))
    const medicinas = { connect, disconnect }

    try {
        await prisma.paciente.update({
            where: { id },
            data: {
                nombre,
                fecha_nacimiento,
                plantaId,
                medicinas
            }
        })
        revalidatePath('/pacientes')
        return { success: 'Paciente modificado con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}

export async function eliminarPaciente(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.paciente.delete({
            where: { id },
        })
        revalidatePath('/pacientes')
        return { success: 'Paciente eliminado con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



