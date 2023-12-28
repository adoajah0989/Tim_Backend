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

  export const addDarurat = async (req, res) => {
    try {
      // Ambil data dari body request
      const {
        lokasi,
        no_damkar,
        no_polsek,
        no_babinKab,
        no_babinsa,
        no_instansi,
        no_pimpinan,
        no_kodalops,
        no_it,
      } = req.body;
  
      // Simpan data ke database
      const newDarurat = await Darurat.create({
        lokasi,
        no_damkar,
        no_polsek,
        no_babinKab,
        no_babinsa,
        no_instansi,
        no_pimpinan,
        no_kodalops,
        no_it,
      });
  
      // Kirim respons sukses ke client
      res.status(201).json({ message: 'Data successfully added', data: newDarurat });
    } catch (error) {
      console.error('Error in addDarurat:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };