import Darurat from "../models/DaruratModel.js";

export const getDaruratByLocation = async (req, res) => {
  try {
    const { lokasi } = req.params;

    const daruratData = await Darurat.findAll({
      where: { lokasi },
      raw: true,
    });

    const result = {};
    daruratData.forEach((data) => {
      const { type, nomor } = data;

      if (!result[type]) {
        result[type] = [];
      }

      result[type].push(nomor);
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
