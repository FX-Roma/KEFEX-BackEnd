/* opiniones dentro del foro */
import mongoose from "mongoose";

const productoAsociadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  marca: { type: String, required: true, trim: true },
  precio: { type: String, required: true, trim: true },
  imagen: { type: String, default: "" },
  officialUrl: { type: String, required: true, trim: true }
}, { _id: false });

const opinionSchema = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: [true, "El título es obligatorio"], 
    trim: true,
    index: true 
  },
  opinion: { 
    type: String, 
    required: [true, "El contenido de la opinión es obligatorio"], 
    trim: true 
  },
  extracto: { 
    type: String, 
    trim: true 
  },
  categoria: { 
    type: String, 
    required: [true, "La categoría es obligatoria"],
    enum: ["ecommerce", "tecnologia", "moda", "hogar", "gaming", "belleza", "supermercado", "marketplace"],
    default: "ecommerce",
    index: true
  },
  categoriaLabel: { 
    type: String, 
    default: "E-commerce" 
  },
  score: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  votes: { 
    type: Number, 
    default: 0 
  },
  commentsCount: { 
    type: Number, 
    default: 0 
  },
  // Referencia del que creó la publicación
  autor: {
    nombre: { type: String, required: true },
    avatar: { type: String, default: "https://i.pravatar.cc/150" },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
  },
  product: { 
    type: productoAsociadoSchema, 
    required: false 
  },
  isUserPost: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true 
});

// Índice de texto para la API de Búsqueda (Over)
opinionSchema.index({ titulo: "text", opinion: "text", categoria: "text" });

export default mongoose.model("Opinion", opinionSchema);