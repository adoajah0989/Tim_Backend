// controllers/PatroliController.js
import ExpedisiModel from "../models/ExpedisiModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Op, literal } from 'sequelize';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const getStoragePath = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const storagePath = path.resolve(
    "public",
    "image",
    "namaDok",
    `${day}-${month}-${year}`
  );

  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
  }

  return storagePath;
};

let lastResetDay;

try {
  lastResetDay =
    parseInt(fs.readFileSync("lastResetDay.txt", "utf8")) ||
    new Date().getDate();
} catch (err) {
  lastResetDay = new Date().getDate();
  fs.writeFileSync("lastResetDay.txt", lastResetDay.toString(), "utf8");
}

let uploadedFilesCount = 0;

const resetFileCounter = () => {
  const currentDay = new Date().getDate();
  if (currentDay !== lastResetDay) {
    uploadedFilesCount = 1;
    lastResetDay = currentDay;

    fs.writeFileSync("lastResetDay.txt", currentDay.toString(), "utf8");
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    resetFileCounter();
    cb(null, getStoragePath());
  },
  filename: function (req, file, cb) {
    const patroliId = req.params.id;
    const now = new Date();
    const formattedDate = `${now.getDate()}-${
      now.getMonth() + 1
    }-${now.getFullYear()}`;
    uploadedFilesCount++;
    const fileName =
      uploadedFilesCount === 1 ? "foto1" : `foto${uploadedFilesCount}`;

    cb(
      null,
      `namaDok_${fileName}_${formattedDate}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

export const uploadPhotoExpedisi = upload.fields([
  { name: "photo1" }
]);

export const createExpedisi = async (req, res) => {
  try {
    const { tanggal, namaDok, dari, untuk, diserahkan } = req.body;

    if (!req.files || !req.files["photo1"] || !req.files["photo2"]) {
      return res.status(400).json({ msg: "Photo files are required" });
    }

    resetFileCounter();

    const newExpedisi = Expedisi.build({
      tanggal,
      namaDok,
      dari,
      untuk,
      diserahkan,
    });

    const photo1Path = req.files["photo1"][0].filename;

    const storagePath = getStoragePath();

    newExpedisi.url1 = `/image/namaDok/${photo1Path}`;

    await newExpedisi.save();

    res
      .status(201)
      .json({ id: newExpedisi.id, msg: "Data Expedisi berhasil dibuat" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Nama dokumen harus diisi" });
  }
};

export const updateExpedisi = async (req, res) => {
  try {
    const { id } = req.params;
    const { tanggal, namaDok, dari, untuk, diserahkan } = req.body;

    const expedisiToUpdate = await Expedisi.findByPk(id);

    if (!expedisiToUpdate) {
      return res.status(404).json({ msg: "Record tidak ditemukan" });
    }

    expedisiToUpdate.tanggal = tanggal;
    expedisiToUpdate.namaDok = namaDok;
    expedisiToUpdate.dari = dari;
    expedisiToUpdate.untuk = untuk;
    expedisiToUpdate.diserahkan = diserahkan;

    if (req.files) {
      const photo1Path = req.files["photo1"][0].filename;

      const storagePath = getStoragePath();

      expedisiToUpdate.photo1Url = `/image/namaDok/${photo1Path}`;
    }

    await expedisiToUpdate.save();

    res.json({ msg: "Data expedisi berhasil diperbarui" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};

export const getExpedisi = async (req, res) => {
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

  const totalRows = await ExpedisiModel.count({
      where: {
          [Op.or]: [
              { tanggal: { [Op.like]: '%' + search + '%' } },
              { namaDok: { [Op.like]: '%' + search + '%' } },
              { dari: { [Op.like]: '%' + search + '%' } },
              { untuk: { [Op.like]: '%' + search + '%' } },
              { diserahkan: { [Op.like]: '%' + search + '%' } },
          ]
      }
  });

  const totalPage = Math.ceil(totalRows / limit);

  const result = await ExpedisiModel.findAll({
      attributes: [
          'id',
          [literal("DATE_FORMAT(tanggal, '%d %m %Y')"), 'formattedTanggal'],
          'namaDok',
          'dari',
          'url1',
          'untuk',
          'diserahkan'
      ],
      where: {
          [Op.and]: [
              dateFilter,
              {
                  [Op.or]: [
                      { tanggal: { [Op.like]: '%' + search + '%' } },
                      { namaDok: { [Op.like]: '%' + search + '%' } },
                      { dari: { [Op.like]: '%' + search + '%' } },
                      { untuk: { [Op.like]: '%' + search + '%' } },
                      { diserahkan: { [Op.like]: '%' + search + '%' } },
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

export const getExpedisiById = async (req, res) => {
  try {
    const response = await ExpedisiModel.findOne({
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

export const saveExpedisi = (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No File Uploaded" });
  }

  const { tanggal, namaDok } = req.body;
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
      await Patroli.create({ tanggal, namaDok, image: fileName, url });
      res.status(201).json({ msg: "Patroli Created Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });
};

export const deleteExpedisi = async (req, res) => {
  const expedisi = await ExpedisiModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!expedisi) {
    return res.status(404).json({ msg: "No Data Found" });
  }

  try {
    const imagePath = expedisi.url1;

    if (!imagePath) {
      return res.status(400).json({ msg: "Image path is undefined" });
    }

    const filepath = `./public/images/${imagePath}`;

    // Pengecekan apakah file dengan path tersebut ada
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);

      await ExpedisiModel.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({ msg: "Expedisi Deleted Successfully" });
    } else {
      res.status(404).json({ msg: "File not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
