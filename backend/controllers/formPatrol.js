import FormPatrol from '../models/formpatrolModel.js';
import path from 'path';
import fs from 'fs';

// Mendapatkan semua data Form Patrol
export const getFormPatrols = async (req, res) => {
  try {
    const formPatrols = await FormPatrol.findAll();
    res.json(formPatrols);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Mendapatkan data Form Patrol berdasarkan ID
export const getFormPatrolById = async (req, res) => {
  try {
    const formPatrol = await FormPatrol.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!formPatrol) {
      return res.status(404).json({ msg: 'Form Patrol not found' });
    }

    res.json(formPatrol);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const saveFormPatrol = async (req, res) => {
  try {
    const { lokasi, uraianTemuan, tindakLanjut, status } = req.body;
    const file1 = req.files.Url_Bukti1;
    const file2 = req.files.Url_Bukti2;

    // Process each file if they exist
    let buffer1 = null;
    let buffer2 = null;

    if (file1) {
      buffer1 = fs.readFileSync(file1.tempFilePath);
    }

    if (file2) {
      buffer2 = fs.readFileSync(file2.tempFilePath);
    }

    // Create a new FormPatrol document in the database
    const newFormPatrol = await FormPatrol.create({
      lokasi,
      uraianTemuan,
      Url_Bukti1: buffer1,
      Url_Bukti2: buffer2,
      tindakLanjut,
      status,
    });

    res.json(newFormPatrol);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
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

    res.json({ msg: 'Form Patrol updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
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

    res.json({ msg: 'Form Patrol deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
