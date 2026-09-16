import express from 'express'; // realizamos la conexion con el puerto
import morgan from 'morgan';  //se encarga de moniterear las solicitudes http en vivo
import path from 'path';
import cors from 'cors';

import productoRoutes from './Routes/E-ProductStoreRoutes.js';

const servidorKefex = express(); 

servidorKefex.use(cors());
servidorKefex.use(morgan("dev"));
servidorKefex.use(express.json());

// Registro de las rutas en la API
servidorKefex.use('/api/productos', productoRoutes);

servidorKefex.get('/', (req, res) => {
    res.status(200).json({ mensaje: "Servidor KEFEX activo" });
});

servidorKefex.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

export default servidorKefex;