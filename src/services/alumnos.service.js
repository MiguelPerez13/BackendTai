const prisma = require('../config/prisma.js');

const getAlumnos = async () => {
    return await prisma.alumnos.findMany({
        select: {
            id: true,
            nombre: true,
            apellido: true,
            matricula: true,
            carrera: true,
            semestre: true,
            correo: true,
        },
    });
};

const getAlumnoById = async (id) => {
    const alumno = await prisma.alumnos.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            nombre: true,
            apellido: true,
            matricula: true,
            carrera: true,
            semestre: true,
            correo: true,
        },
    });

    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }

    return alumno;
};

const createAlumno = async ({ nombre, apellido, matricula, carrera, semestre, correo }) => {
    return await prisma.alumnos.create({
        data: {
            nombre,
            apellido,
            matricula,
            carrera,
            semestre: Number(semestre),
            correo,
        },
    });
};

const updateAlumno = async (id, data) => {
    const alumnoExistente = await prisma.alumnos.findUnique({
        where: { id: Number(id) },
    });

    if (!alumnoExistente) {
        throw new Error('Alumno no encontrado');
    }

    const updateData = {
        ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
        ...(data.apellido !== undefined ? { apellido: data.apellido } : {}),
        ...(data.matricula !== undefined ? { matricula: data.matricula } : {}),
        ...(data.carrera !== undefined ? { carrera: data.carrera } : {}),
        ...(data.semestre !== undefined ? { semestre: Number(data.semestre) } : {}),
        ...(data.correo !== undefined ? { correo: data.correo } : {}),
    };

    return await prisma.alumnos.update({
        where: { id: Number(id) },
        data: updateData,
    });
};

const deleteAlumno = async (id) => {
    const alumnoExistente = await prisma.alumnos.findUnique({
        where: { id: Number(id) },
    });

    if (!alumnoExistente) {
        throw new Error('Alumno no encontrado');
    }

    await prisma.alumnos.delete({
        where: { id: Number(id) },
    });

    return {
        message: 'Alumno eliminado correctamente',
    };
};

module.exports = {
    getAlumnos,
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno,
};