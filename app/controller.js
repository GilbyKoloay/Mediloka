const user = require('./userModel');
const RS = require('./RSModel');
const dokter = require('./dokterModel');



// tambah user baru (nd dengan rekam medis)
const createUser = async(req, res, next) => {
    try {
        const result = await user.create({
            email: req.body.email,
            password: req.body.password,
            nama: req.body.nama,
            tempatLahir: req.body.tempatLahir,
            tanggalLahir: new Date(`${req.body.tahunLahir}-${(parseInt(req.body.bulanLahir) < 10) ? `0${parseInt(req.body.bulanLahir)}` : req.body.bulanLahir}-${(parseInt(req.body.tanggalLahir) < 10) ? `0${parseInt(req.body.tanggalLahir)}` : req.body.tanggalLahir}`),
            jenisKelamin: req.body.jenisKelamin,
        });

        res.send({
            status: `success`,
            message: `Success creating new user.`,
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: `error`,
            message: `Failed creating new user.`,
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
            status: `success`,
            message: `Success adding new medical record.`,
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: `error`,
            message: `Failed adding new medical record.`,
            desc: e.message,
        });
    }
};



module.exports = {
    createUser,
    createUserRM,
};
