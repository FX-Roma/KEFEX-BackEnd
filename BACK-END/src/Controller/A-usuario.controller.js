import Usuario from "../Models/A-usuario.model.js";

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: nuevoUsuario
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear el usuario",
            error: error.message
        });
    }
};


// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();

        res.status(200).json({
            usuarios
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los usuarios",
            error: error.message
        });
    }
};


// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            usuario
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el usuario",
            error: error.message
        });
    }
};


// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuario
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el usuario",
            error: error.message
        });
    }
};


// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el usuario",
            error: error.message
        });
    }
};


// Exportar las funciones
export {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};