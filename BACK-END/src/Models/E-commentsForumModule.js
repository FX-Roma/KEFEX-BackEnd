/* Comentarios de usuarios */
import mongoose from "mongoose";

const comentarioForoSchema = new mongoose.Schema({
  // Relación con el post del foro al que pertenece
  opinionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Opinion", 
    required: true,
    index: true 
  },
  autor: {
    nombre: { type: String, required: true },
    avatar: { type: String, default: "https://i.pravatar.cc/150" },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
  },
  texto: { 
    type: String, 
    required: [true, "El contenido del comentario no puede estar vacío"], 
    trim: true 
  },
  likes: { 
    type: Number, 
    default: 0 
  }
}, { 
  timestamps: true 
});

export default mongoose.model("ComentarioForo", comentarioForoSchema);