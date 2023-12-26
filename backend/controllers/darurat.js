import Darurat from "../models/daruratModel.js";

export const getDarurat = async (req, res) => {
    try {
      const result = await Darurat.findAll();
      
      if (result.length === 0) {
        // Jika tidak ada data ditemukan
        res.status(404).json({ message: 'Data not found' });
      } else {
        // Jika data ditemukan
        res.status(200).json(result);
      }
    } catch (error) {
      console.error('Error in getPatroliQ:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };