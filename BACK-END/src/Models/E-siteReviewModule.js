/* Modulo para el e commerce del dia */
import mongoose from "mongoose";

const siteEvaluatedSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  urlOficial: { 
    type: String, 
    required: true, 
    trim: true 
  },
  logo: { 
    type: String, 
    default: "" 
  },
  descripcion: { 
    type: String, 
    trim: true 
  },
  ratingPromedio: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  totalOpiniones: { 
    type: Number, 
    default: 0 
  },
  categoria: { 
    type: String, 
    enum: ["ecommerce", "marketplace", "tienda_oficial"],
    default: "ecommerce"
  },
  esSitioDelDia: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true 
});

export default mongoose.model("Sitio", sitioSchema);