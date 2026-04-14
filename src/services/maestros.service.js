const prisma = require('../config/prisma.js');

const getMaestros = async () => {
    return await prisma.maestros.findMany({
        select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            carrera: true,
        },
    });
};

const getMaestroById = async (id) => {
    const maestro = await prisma.maestros.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            carrera: true,
        },
    });

    if (!maestro) {
        throw new Error('Maestro no encontrado');
    }

    return maestro;
};

const createMaestro = async ({ nombre, apellido, correo, carrera }) => {
    return await prisma.maestros.create({
        data: {
            nombre,
            apellido,
            correo,
            carrera,
        },
    });
};

const updateMaestro = async (id, data) => {
    const maestroExistente = await prisma.maestros.findUnique({
        where: { id: Number(id) },
    });

    if (!maestroExistente) {
        throw new Error('Maestro no encontrado');
    }

    const updateData = {
        ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
        ...(data.apellido !== undefined ? { apellido: data.apellido } : {}),
        ...(data.correo !== undefined ? { correo: data.correo } : {}),
        ...(data.carrera !== undefined ? { carrera: data.carrera } : {}),
    };

    return await prisma.maestros.update({
        where: { id: Number(id) },
        data: updateData,
    });
};

const deleteMaestro = async (id) => {
    const maestroExistente = await prisma.maestros.findUnique({
        where: { id: Number(id) },
    });

    if (!maestroExistente) {
        throw new Error('Maestro no encontrado');
    }

    await prisma.maestros.delete({
        where: { id: Number(id) },
    });

    return {
        message: 'Maestro eliminado correctamente',
    };
};

module.exports =  {
    getMaestros,
    getMaestroById,
    createMaestro,
    updateMaestro,
    deleteMaestro,
};