import BMutasi from "../models/bukumutasiModel.js";

export const getBMutasi = async(req, res) =>{
    try {
        const response = await BMutasi.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
    
}

export const getBMutasiById = async(req, res) =>{
    try {
        const response = await BMutasi.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBMutasi = async(req, res) =>{
    try {
        await BMutasi.destroy({
            where:{
                id: req.params.id
            }
        });
            res.status(200).json({msg:"terhapus.."});
    } catch (error) {
        console.log(error.message);
    }
}

// export const deleteGuest = async(req, res) =>{
//     try {
//         await Guest.destroy({
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Deleted"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }
