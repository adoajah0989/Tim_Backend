import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Photo from '../models/AssetModel.js';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const getStoragePath = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const storagePath = path.resolve('public', 'image', 'asset', `${day}-${month}-${year}`);

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
    const customFileName = `asset_foto${fileNumber}_${formattedDate}${path.extname(file.originalname)}`;
    cb(null, customFileName);
  },
});

const upload = multer({ storage: storage });

export const uploadPhotos = upload.fields([{ name: 'photo1' }, { name: 'photo2' }]);

export const handleUpload = async (req, res) => {
  try {
    const storagePath = getStoragePath();
    const photo1Path = req.files['photo1'][0].filename;
    const photo2Path = req.files['photo2'][0].filename;
    const catatan = req.body.catatan;
    const lokasi = req.body.lokasi;
    const timestamp = req.body.timestamp;

    const newPhotoTest = await Photo.create({
      url1: `/image/${storagePath}/${photo1Path}`,
      url2: `/image/${storagePath}/${photo2Path}`,
      catatan: catatan,
      lokasi: lokasi,
      timestamp: timestamp
    });

    res.json({ success: true, message: 'Sukses Upload', newPhotoTest });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
