import Asset from '../models/AssetModel.js';
import fs from 'fs';
import path from 'path';

export const createAsset = async (req, res) => {
  let bukti1Filename = null;
  let bukti2Filename = null;

  try {
    // Check if req.files is defined and has the expected properties
    const bukti1 = req.files && req.files['bukti1'] ? req.files['bukti1'][0] : null;
    const bukti2 = req.files && req.files['bukti2'] ? req.files['bukti2'][0] : null;

    // Check if the images are provided
    if (!bukti1 || !bukti2) {
      return res.status(400).json({ msg: 'Both bukti1 and bukti2 images are required' });
    }

    bukti1Filename = `bukti1_${Date.now()}${path.extname(bukti1.originalname)}`;
    bukti2Filename = `bukti2_${Date.now()}${path.extname(bukti2.originalname)}`;

    // Define the upload directory
    const uploadDir = path.join(__dirname, '..', 'public', 'image');

    fs.writeFileSync(path.join(uploadDir, bukti1Filename), bukti1.buffer);
    fs.writeFileSync(path.join(uploadDir, bukti2Filename), bukti2.buffer);

    const newAsset = await Asset.create({
      bukti1_url: `/image/${bukti1Filename}`,
      bukti2_url: `/image/${bukti2Filename}`,
      catatan: req.body.catatan, // Assuming catatan is in the request body
    });

    res.status(201).json({ msg: 'Asset created successfully' });
  } catch (error) {
    console.error('Error creating asset:', error);

    // Handle errors and delete uploaded files (if any)
    if (bukti1Filename) {
      fs.unlinkSync(path.join(uploadDir, bukti1Filename));
    }

    if (bukti2Filename) {
      fs.unlinkSync(path.join(uploadDir, bukti2Filename));
    }

    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
