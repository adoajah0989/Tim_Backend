// controllers/PatroliController.js
import Patroli from "../models/formpatrolModel.js";
import path from "path";
import fs from "fs";

export const getPatroli = async (req, res) => {
  try {
    const response = await Patroli.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getPatroliById = async (req, res) => {
  try {
    const response = await Patroli.findOne({
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

export const savePatroli = (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No File Uploaded" });
  }

  const { tanggal, urai_temuan } = req.body;
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
      await Patroli.create({ tanggal, urai_temuan, image: fileName, url });
      res.status(201).json({ msg: "Patroli Created Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });
};

export const updatePatroli = async (req, res) => {
  const patroli = await Patroli.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!patroli) {
    return res.status(404).json({ msg: "No Data Found" });
  }

  let fileName = "";
  if (req.files === null) {
    fileName = patroli.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Images" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    const filepath = `./public/images/${patroli.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
    });
  }

  const { tanggal, urai_temuan } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Patroli.update(
      { tanggal, urai_temuan, image: fileName, url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Patroli Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deletePatroli = async (req, res) => {
  const patroli = await Patroli.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!patroli) {
    return res.status(404).json({ msg: "No Data Found" });
  }

  try {
    const imagePath = patroli.image;
    
    if (!imagePath) {
      return res.status(400).json({ msg: "Image path is undefined" });
    }

    const filepath = `./public/images/${imagePath}`;

    // Pengecekan apakah file dengan path tersebut ada
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);

      await Patroli.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({ msg: "Patroli Deleted Successfully" });
    } else {
      res.status(404).json({ msg: "File not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

