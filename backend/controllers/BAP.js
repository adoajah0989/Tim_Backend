import BAP from "../models/BAPModel.js";
 
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
