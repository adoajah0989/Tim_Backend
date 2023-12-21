import Guest from "../models/GuestModel.js";
import {Op} from "sequelize";

export const getGuests = async(req, res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const startDate = req.query.startDate || ""; // Tambahkan ini
    const endDate = req.query.endDate || ""; 
     
    const dateFilter = startDate && endDate ? {
        tanggal: {
          [Op.between]: [startDate, endDate]
        }
      } : {};
    const totalRows = await Guest.count({
        where:{
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}, {tanggal:{
                [Op.like]: '%'+search+'%'
            }}, {alamat:{
                [Op.like]: '%'+search+'%'
            }},{orang_yang_dituju:{
                [Op.like]: '%'+search+'%'
            }},{keperluan:{
                [Op.like]: '%'+search+'%'
            }},{no_kendaraan:{
                [Op.like]: '%'+search+'%'
            }},{no_ktp:{
                [Op.like]: '%'+search+'%'
            }},{catatan:{
                [Op.like]: '%'+search+'%'
            }}
        ]
        }
    });  
    
    
    
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Guest.findAll({
        where: {
            [Op.and]: [
              // (Tambahkan bagian ini untuk filter tanggal)
              dateFilter,
              // (Lanjutkan dengan filter pencarian seperti sebelumnya)
              {
                [Op.or]: [
                  {
                    nama: {
                      [Op.like]: '%' + search + '%'
                    }
                  },
                  {
                    tanggal: {
                      [Op.like]: '%' + search + '%'
                    }
                  },
                  {
                    alamat: {
                      [Op.like]: '%' + search + '%'
                    }
                  },
                  {
                    orang_yang_dituju: {
                      [Op.like]: '%' + search + '%'
                    }
                  },
                  {
                    keperluan: {
                      [Op.like]: '%' + search + '%'
                    }
                  },
                  {
                    no_kendaraan: {
                      [Op.like]: '%' + search + '%'
                    }
                  },
                  {
                    no_ktp: {
                      [Op.like]: '%' + search + '%'
                    }
                  },
                  {
                    catatan: {
                      [Op.like]: '%' + search + '%'
                    }
                  },
                ]
              },
            ],
          },
        offset: offset,
        limit: limit,
        order:[
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

