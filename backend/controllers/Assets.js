import Asset from '../models/AssetModel.js';
import path from 'path';

export const saveAsset = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { catatan } = req.body;

    // Check if both images are provided
    if (!req.files || !req.files.bukti1 || !req.files.bukti2) {
      return res.status(400).json({ error: 'Both images are required.' });
    }

    const bukti1 = req.files.bukti1;
    const bukti2 = req.files.bukti2;

    // Get the directory name of the current module
    const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);

    // Save images to public/image folder
    const bukti1Path = path.join(currentModuleDir, '../public/images', `${Date.now()}_bukti1.jpg`);
    const bukti2Path = path.join(currentModuleDir, '../public/images', `${Date.now()}_bukti2.jpg`);

    bukti1.mv(bukti1Path);
    bukti2.mv(bukti2Path);

    // Save asset information in the database
    const asset = await Asset.create({
      catatan,
      image1: bukti1Path,
      image2: bukti2Path,
    });

    res.status(201).json({ message: 'Asset saved successfully.', asset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
