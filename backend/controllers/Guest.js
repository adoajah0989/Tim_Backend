import Guest from "../models/GuestModel.js";

export const getGuests = async(req, res) =>{
    try {
        const response = await Guest.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getGuestById = async(req, res) =>{
    try {
        const response = await Guest.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createGuest = async(req, res) =>{
    const { tanggal, nama, alamat, orang_yang_dituju, keperluan, no_kendaraan, no_ktp, catatan } = req.body;
    try {
        await Guest.create({
            tanggal: tanggal,
            nama: nama,
            alamat: alamat,
            orang_yang_dituju: orang_yang_dituju,
            keperluan: keperluan,
            no_kendaraan: no_kendaraan, 
            no_ktp: no_ktp,
            catatan: catatan
        });
        res.status(201).json({msg: "Registrasi Sukses"});
        alert('Registrasi Sukses');
    } catch (error) {
        console.log(error);
    }
}

export const updateGuest = async(req, res) =>{
    try {
        await Guest.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteGuest = async(req, res) =>{
    try {
        await Guest.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

