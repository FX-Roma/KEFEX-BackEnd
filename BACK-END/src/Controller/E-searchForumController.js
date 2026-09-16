import Opinion from "../models/opinion.model.js";
import Sitio from "../models/sitio.model.js";

/* Búsqueda global para la barra superior de KEFEX, GET /api/busqueda?q=shopify */
export const buscarGlobal = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ mensaje: "El término de búsqueda no puede estar vacío" });
    }

    const regex = new RegExp(q, "i"); // Búsqueda insensible a mayúsculas/minúsculas

    // Realizar búsquedas en paralelo
    const [opiniones, sitios] = await Promise.all([
      Opinion.find({
        $or: [{ titulo: regex }, { opinion: regex }, { categoria: regex }]
      }).limit(10),
      Sitio.find({
        $or: [{ nombre: regex }, { descripcion: regex }]
      }).limit(5)
    ]);

    res.status(200).json({
      query: q,
      totalResultados: opiniones.length + sitios.length,
      resultados: {
        opiniones,
        sitios
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al ejecutar la búsqueda", error: error.message });
  }
};