import BAP from "../models/BAPModel.js";
import {Op, literal} from "sequelize";
 
export const createBAP = async (req, res) => {
    try {
        const { 
            tanggal,
            jam,
            pemeriksa,
            diperiksa,
            ttl,
            pekerjaan,
            alamat,
            ktp,
            hp,
            pertanyaan1,
            pertanyaan2,
            pertanyaan3,
            pertanyaan4,
            pertanyaan5
        } = req.body;

        const pertanyaan4_value = pertanyaan4 ? pertanyaan4 : '';
        const pertanyaan5_value = pertanyaan5 ? pertanyaan5 : '';

        await BAP.create({
            tanggal,
            jam,
            pemeriksa,
            diperiksa,
            ttl,
            pekerjaan,
            alamat,
            ktp,
            hp,
            pertanyaan1,
            pertanyaan2,
            pertanyaan3,
            pertanyaan4_value,
            pertanyaan5_value
        });

        res.json({ msg: "Data mutasi berhasil diupdate" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const getBap = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const startDate = req.query.startDate || "";
    const endDate = req.query.endDate || "";
  
    const dateFilter = startDate && endDate ? {
      tanggal: {
        [Op.between]: [startDate, endDate]
      }
    } : {};
  
    const totalRows = await BAP.count({
      where: {
        [Op.or]: [
          { tanggal: { [Op.like]: '%' + search + '%' } },
          { jam: { [Op.like]: '%' + search + '%' } },
          // Tambahkan kolom lain yang ingin Anda cari di sini
        ]
      },
    });
  
    const totalPage = Math.ceil(totalRows / limit);
    const result = await BAP.findAll({
      attributes: [
        'id',
        [literal("DATE_FORMAT(tanggal, '%d %m %Y')"), 'formattedTanggal'],
        'jam',
        'pemeriksa',
        'diperiksa',
        'ttl',
        'pekerjaan',
        'alamat',
        'ktp',
        'hp',
        'pertanyaan1',
        'pertanyaan2',
        'pertanyaan3',
        'pertanyaan4',
        'pertanyaan5'
      ],
      where: {
        [Op.and]: [
          dateFilter,
          {
            [Op.or]: [
                { tanggal: { [Op.like]: '%' + search + '%' } },
                { jam: { [Op.like]: '%' + search + '%' } },
                { pemeriksa: { [Op.like]: '%' + search + '%' } },
                { diperiksa: { [Op.like]: '%' + search + '%' } },
                { ttl: { [Op.like]: '%' + search + '%' } },
                { pekerjaan: { [Op.like]: '%' + search + '%' } },
                { alamat: { [Op.like]: '%' + search + '%' } },
                { ktp: { [Op.like]: '%' + search + '%' } },
                { hp: { [Op.like]: '%' + search + '%' } },
                { pertanyaan1: { [Op.like]: '%' + search + '%' } },
                { pertanyaan2: { [Op.like]: '%' + search + '%' } },
                { pertanyaan3: { [Op.like]: '%' + search + '%' } },
                { pertanyaan4: { [Op.like]: '%' + search + '%' } },
                { pertanyaan5: { [Op.like]: '%' + search + '%' } },
              
            ]
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [
        ['tanggal', 'DESC']
      ]
    });
  
    res.json({
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage
    });
  };
  
  export const getBapById = async (req, res) => {
    try {
      const response = await BAP.findOne({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteBAP = async(req, res) =>{
    try {
        await BAP.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Deleted"});
    } catch (error) {
        console.log(error.message);
    }
  }