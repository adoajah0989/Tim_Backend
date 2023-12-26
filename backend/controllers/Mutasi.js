import Mutasi from "../models/MutasiModel.js";
 
export const updateMutasi = async (req, res) => {
    try {
        const { 
            tanggal, 
            shift, 
            anggota_1, 
            anggota_2, 
            anggota_3,
            kegiatan_1, 
            kegiatan_2, 
            danru_a,
            danru_b 
        } = req.body;

        const kegiatan_2_value = kegiatan_2 ? kegiatan_2 : '';
        const anggota_3_value = anggota_3 ? anggota_3 : '';



        await Mutasi.create({
            tanggal,
            shift,
            anggota_1,
            anggota_2,
            anggota_3: anggota_3_value,
            kegiatan_1,
            kegiatan_2: kegiatan_2_value,
            danru_a,
            danru_b,
        });

        res.json({ msg: "Data mutasi berhasil diupdate" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
