const user = require('./userModel');
const RS = require('./RSModel');
const dokter = require('./dokterModel');



// ambil semua user
const allUser = async(req, res, next) => {
    try {
        const result = await user.find();

        res.send({
            status: `Success`,
            message: `Success getting all user data.`,
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed getting all user data.`,
            desc: e.message,
        });
    }
};

// tambah user baru (nd dengan rekam medis)
const createUser = async(req, res, next) => {
    try {
        const exist = await user.find({
            email: req.body.email
        });
        
        if(exist.length > 0) {
            res.send({
                status: `Error`,
                message: `Failed creating new user.`,
                desc: `Email already exist.`,
            });
        }
        else if(exist.length === 0) {
            const result = await user.create({
                email: req.body.email,
                password: req.body.password,
                nama: req.body.nama,
                tempatLahir: req.body.tempatLahir,
                tanggalLahir: new Date(`${req.body.tahunLahir}-${(parseInt(req.body.bulanLahir) < 10) ? `0${parseInt(req.body.bulanLahir)}` : req.body.bulanLahir}-${(parseInt(req.body.tanggalLahir) < 10) ? `0${parseInt(req.body.tanggalLahir)}` : req.body.tanggalLahir}`),
                jenisKelamin: req.body.jenisKelamin,
            });

            res.send({
                status: `Success`,
                message: `Success creating new user.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed creating new user.`,
            desc: e.message,
        });
    }
};

// update user data
const updateUser = async(req, res, next) => {
    console.log(req.body);
    try {
        const exist = await user.find({
            _id: req.body._id,
        });

        if(exist.length === 0) {
            res.send({
                status: `Error`,
                message: `Failed to update user data.`,
                desc: `User not found.`
            });
        }
        else if(exist.length > 0) {
            const result = await user.updateOne({
                _id: req.body._id,
            }, {
                email: req.body.email,
                password: req.body.password,
                nama: req.body.nama,
                tempatLahir: req.body.tempatLahir,
                tanggalLahir: new Date(`${req.body.tahunLahir}-${(parseInt(req.body.bulanLahir) < 10) ? `0${parseInt(req.body.bulanLahir)}` : req.body.bulanLahir}-${(parseInt(req.body.tanggalLahir) < 10) ? `0${parseInt(req.body.tanggalLahir)}` : req.body.tanggalLahir}`),
                jenisKelamin: req.body.jenisKelamin,
            });
    
            res.send({
                status: `Success`,
                message: `Success to udpate user data.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed to udpate user data.`,
            desc: e.message,
        });
    }
};

// tambah rekam medis di user
const createUserRM = async(req, res, next) => {
    try {
        const result = await user.updateOne({
            _id: req.body._id,
        }, {
            $push: {
                rekamMedis: {
                    tanggalPeriksa: new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        new Date().getDate(),
                        new Date().getHours(),
                        new Date().getMinutes(),
                        new Date().getSeconds(),
                    ),
                    diagnosa: req.body.diagnosa,
                    tindakan: req.body.tindakan,
                    keadaanKeluar: req.body.keadaanKeluar,
                    caraKeluar: req.body.caraKeluar,
                }
            }
        });

        res.send({
            status: `Success`,
            message: `Success adding new medical record.`,
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed adding new medical record.`,
            desc: e.message,
        });
    }
};



module.exports = {
    allUser,
    createUser,
    updateUser,
    createUserRM,
};
