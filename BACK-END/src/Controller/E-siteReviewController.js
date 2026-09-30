import SiteReview from "../Models/E-siteReviewModule.js";

const siteReviewController = {
  createSite: async (req, res) => {
    try {
      const newSite = new SiteReview(req.body);
      const savedSite = await newSite.save();

      res.status(201).json({
        result: "success",
        message: "Site created successfully",
        data: savedSite
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "Failed to create site review",
        error: error.message || error
      });
    }
  },

  getAllSites: async (req, res) => {
    try {
      const sites = await SiteReview.find().sort({ averageRating: -1 });

      res.status(200).json({
        result: "success",
        message: "Sites retrieved successfully",
        data: sites
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "Failed to retrieve sites",
        error: error.message || error
      });
    }
  },

  getFeaturedSite: async (req, res) => {
    try {
      // Ordenamos por updatedAt desc (-1) para obtener siempre el último marcado
      const featuredSite = await SiteReview.findOne({ isFeaturedSite: true })
        .sort({ updatedAt: -1 });

      if (!featuredSite) {
        return res.status(404).json({
          result: "error",
          message: "No hay ningún sitio destacado registrado actualmente"
        });
      }

      res.status(200).json({
        result: "success",
        message: "Sitio destacado obtenido correctamente",
        data: featuredSite
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "Error al obtener el sitio destacado",
        error: error.message || error
      });
    }
  },

  getSiteById: async (req, res) => {
    try {
      const site = await SiteReview.findById(req.params.id);

      if (!site) {
        return res.status(404).json({
          result: "error",
          message: "Site not found"
        });
      }

      res.status(200).json({
        result: "success",
        message: "Site retrieved successfully",
        data: site
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "Failed to retrieve site",
        error: error.message || error
      });
    }
  },

  updateSite: async (req, res) => {
    try {
      const { id } = req.params;

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          result: "error",
          message: "No se enviaron campos para actualizar"
        });
      }

      if (req.body.isFeaturedSite === true) {
        await SiteReview.updateMany(
          { _id: { $ne: id } }, // Todos los IDs diferentes al que se actualiza
          { $set: { isFeaturedSite: false } }
        );
      }

      const updatedSite = await SiteReview.findByIdAndUpdate(
        id,
        req.body,
        { 
          new: true, 
          runValidators: true 
        }
      );

      if (!updatedSite) {
        return res.status(404).json({
          result: "error",
          message: "No se encontró ningún sitio con el ID proporcionado"
        });
      }

      res.status(200).json({
        result: "success",
        message: "Sitio actualizado correctamente",
        data: updatedSite
      });

    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          result: "error",
          message: "Ya existe otro sitio registrado con ese nombre ('name')"
        });
      }

      res.status(500).json({
        result: "error",
        message: "Error al actualizar el sitio",
        error: error.message || error
      });
    }
  },

  deleteSite: async (req, res) => {
    try {
      const deletedSite = await SiteReview.findByIdAndDelete(req.params.id);

      if (!deletedSite) {
        return res.status(404).json({
          result: "error",
          message: "Site not found to delete"
        });
      }

      res.status(200).json({
        result: "success",
        message: "Site deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        result: "error",
        message: "Failed to delete site",
        error: error.message || error
      });
    }
  }
};

export default siteReviewController;