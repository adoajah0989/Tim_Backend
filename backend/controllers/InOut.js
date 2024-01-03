import multer from 'multer';
import path from 'path';
import fs from 'fs';
import InOut from '../models/inOutModel.js';
import { Op, literal } from 'sequelize';

const getStoragePath = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const storagePath = path.resolve('public', 'image', 'In-Out', `${day}-${month}-${year}`);

  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
  }

  return storagePath;
};

let fileCounter = 1;
let lastResetDay;

try {
  const data = fs.readFileSync('lastResetDay.txt', 'utf8');
  lastResetDay = parseInt(data);
} catch (err) {
  lastResetDay = new Date().getDate();
}

const resetFileCounter = () => {
  const now = new Date();
  const currentDay = now.getDate();
  if (currentDay !== lastResetDay) {
    fileCounter = 1;
    lastResetDay = currentDay;

    fs.writeFileSync('lastResetDay.txt', currentDay.toString(), 'utf8');
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    resetFileCounter();
    cb(null, getStoragePath());
  },
  filename: function (req, file, cb) {
    resetFileCounter();
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const fileNumber = fileCounter++;
    const formattedDate = `${day}-${month}-${year}`;
    const customFileName = `inout_foto${fileNumber}_${formattedDate}${path.extname(file.originalname)}`;
    cb(null, customFileName);
  },
});

const upload = multer({ storage: storage });
export const uploadInOut= upload.single('bukti1');

export const createInOut = async (req, res) => {
    try {
      const storagePath = getStoragePath();
      const { no_kendaraan, time_in } = req.body;
      const photo1Path = req.file.filename;
  
      const newInout = await InOut.create({
        no_kendaraan: no_kendaraan,
        time_in: time_in,
        image: `/image/inout/${photo1Path}`,
      });
  
      res.status(201).json({ id: newInout.id, msg: "Data ekspedisi berhasil dibuat" });
    } catch (error) {
      console.error('Create Ekspedisi error:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  

  export const updateInOut = async (req, res) => {
    try {
      const { id } = req.params;
      const { time_out } = req.body;
  
      const inoutToUpdate = await InOut.findByPk(id);
  
      if (!inoutToUpdate) {
        return res.status(404).json({ msg: "Record tidak ditemukan" });
      }
  
      inoutToUpdate.time_out = time_out;
  
      await inoutToUpdate.save();
  
      res.json({ msg: "Data In-Out berhasil diperbarui" });
    } catch (error) {
      console.error('Update In-Out error:', error);
      res.status(500).json({ msg: "Server Error" });
    }
  };
  

export const createinOut = async (req, res) => {
    try {
    const { no_kendaraan, time_in, time_out } = req.body;

    if (!req.files || !req.files["bukti1"] ) {
        return res.status(400).json({ msg: "bukti files are required" });
      }
  
      resetFileCounter();
  
      const newinOut = InOut.build({
        no_kendaraan,
        time_in,
        time_out,
      });
  
      const photo1Path = req.files["bukti1"][0].filename;
  
      const storagePath = getStoragePath();
  
      newinOut.image = `/image/inout/${photo1Path}`;
  
      await newinOut.save();
  
      res
        .status(201)
        .json({ id: newinOut.id, msg: "Data InOut berhasil dibuat" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Data InOut harus diisi" });
    }
  };
  
  export const updateinOut = async (req, res) => {
    try {
      const { id } = req.params;
      const { no_kendaraan, time_in, time_out } = req.body;
  
      const inOutToUpdate = await InOut.findByPk(id);
  
      if (!inOutToUpdate) {
        return res.status(404).json({ msg: "Record tidak ditemukan" });
      }
  
      inOutToUpdate.no_kendaraan = no_kendaraan;
      inOutToUpdate.time_in = time_in;
      inOutToUpdate.time_out = time_out;
      
  
      if (req.files) {
        const photo1Path = req.files["bukti1"][0].filename;
  
        const storagePath = getStoragePath();
  
        inOutToUpdate.image = `/image/inout/${photo1Path}`;
      }
  
      await inOutToUpdate.save();
  
      res.json({ msg: "Data inOut berhasil diperbarui" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error" });
    }
  };
  
  export const getinOut = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const startDate = req.query.startDate || "";
    const endDate = req.query.endDate || "";
  
    const dateFilter = startDate && endDate ? {
        time_in: {
            [Op.between]: [startDate, endDate]
        }
    } : {};
  
    const totalRows = await InOut.count({
        where: {
            [Op.or]: [
                { no_kendaraan: { [Op.like]: '%' + search + '%' } },
                { time_in: { [Op.like]: '%' + search + '%' } },
                { time_out: { [Op.like]: '%' + search + '%' } },
            ]
        }
    });
  
    const totalPage = Math.ceil(totalRows / limit);
  
    const result = await InOut.findAll({
        attributes: [
            'id',
            'time_in',
            'no_kendaraan',
            'time_out',
            'image'
        ],
        where: {
            [Op.and]: [
                dateFilter,
                {
                    [Op.or]: [
                        { no_kendaraan: { [Op.like]: '%' + search + '%' } },
                        { time_in: { [Op.like]: '%' + search + '%' } },
                        { time_out: { [Op.like]: '%' + search + '%' } },
                    ]
                },
            ],
        },
        offset: offset,
        limit: limit,
        order: [
            ['id', 'DESC']
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
  
  export const getinOutById = async (req, res) => {
    try {
      const response = await InOut.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!response) {
        return res.status(404).json({ msg: "No Data Found" });
      }
      res.json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  export const saveinOut= (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No File Uploaded" });
    }
  
    const { time_in, no_kendaraan } = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
  
    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Images" });
    }
  
    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }
  
    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
  
      try {
        await InOut.create({ time_in, no_kendaraan, image: fileName, url });
        res.status(201).json({ msg: "InOut Created Successfully" });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
      }
    });
  };
  
  export const deleteInOut = async (req, res) => {
    const inout = await InOut.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    if (!inout) {
      return res.status(404).json({ msg: "No Data Found" });
    }
  
    try {
      const imagePath = inout.image;
  
      if (!imagePath) {
        return res.status(400).json({ msg: "Image path is undefined" });
      }
  
      const filepath = `./public/images/${imagePath}`;
  
      // Pengecekan apakah file dengan path tersebut ada
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
  
        await InOut.destroy({
          where: {
            id: req.params.id,
          },
        });
  
        res.status(200).json({ msg: "InOut Deleted Successfully" });
      } else {
        res.status(404).json({ msg: "File not found" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };