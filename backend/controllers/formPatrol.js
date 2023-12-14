import FormPatrol from "../models/formpatrolModel.js";
import path from "path";
import fs from "fs";

// Mendapatkan semua data Form Patrol
export const getFormPatrols = async (req, res) => {
  try {
    const response = await FormPatrol.findAll();
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Mendapatkan data Form Patrol berdasarkan ID
export const getFormPatrolById = async (req, res) => {
  try {
    const response = await FormPatrol.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!response) {
      return res.status(404).json({ msg: "Form Patrol not found" });
    }

    res.json(formPatrol);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const saveFormPatrol = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const tanggal = req.body.tanggal;
  const uraianTemuan = req.body.uraianTemuan;
  const lokasi= req.body.tanggal;
  const tindakLanjut = req.body.tindakLanjut;
  const status = req.body.status;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName1 = file1.md5 + ext;
  const fileName2 = file2.md5 + ext;
  const Url_bukti1 = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await FormPatrol.create({ tanggal:tanggal ,lokasi:lokasi ,uraianTemuan:uraianTemuan, image: fileName, Url_bukti1: Url_bukti1, tindakLanjut:tindakLanjut, status: status });
      res.status(201).json({ msg: "Created Form Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

// Memperbarui data Form Patrol berdasarkan ID
export const updateFormPatrol = async (req, res) => {
  try {
    const { lokasi, uraianTemuan, tindakLanjut, status } = req.body;

    // Lakukan validasi form jika diperlukan

    await FormPatrol.update(
      {
        lokasi,
        uraianTemuan,
        tindakLanjut,
        status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json({ msg: "Form Patrol updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Menghapus data Form Patrol berdasarkan ID
export const deleteFormPatrol = async (req, res) => {
  try {
    await FormPatrol.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ msg: "Form Patrol deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
