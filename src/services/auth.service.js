const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');

const login = async({email,password}) => {
    console.log(email);
    
    const user = await prisma.users.findUnique({
        where : {email}
    });

    if (!user) {
        throw new Error('Credenciales invalidas');
    }

    const isPasswordValid = bcrypt.compare(password,user.password);

    if (!isPasswordValid){
        throw new Error('Credenciales invalidas');
    }

    const token = jwt.sign(
        {
            userId : user.id,
            email : user.email,
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )

    return {
        message: 'Login correcto',
        token : token
    }
}

const register = async({name,email,password}) =>{
    const existeUsuario = await prisma.users.findUnique({
        where : {email}
    })

    if (existeUsuario){
        throw new Error("EL correo ya esta registrado");
    }

    const hashPass = await bcrypt.hash(password,10);

    const user = await prisma.users.create({
        data: {
            name,
            email,
            password : hashPass
        }
    })

    return {
        message : "Usuario registrado correctamente",
        user : {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}

const getUsers = async()=>{
    return await prisma.users.findMany(
        {
            select:{
                id:true,
                name:true,
                email:true
            }
        }
    )
}

const getUserById = async(id) => {
    const user = await prisma.users.findUnique({
        where : {id: Number(id)},
        select:{
            id:true,
            name:true,
            email:true
        }
    })
    if(!user){
        throw new Error("User no encontrado");
    }

    return user;
};

const editUser = async({id , nombre , correo}) => {
    const existeUsuario = getUserById(id);

    if (!existeUsuario){
        throw new Error("Este no existe");
    }

    const updateUser = await prisma.user.update({
        where: {
            id: 'idUser', // El campo debe ser único
        },
        data: {
            name: nombre,
            role: correo,
        },
    });

    return updateUser;

};
module.exports = {
    login,
    register,
    getUsers,
    getUserById,
    editUser
};
