const user = require('./userModel');
const RS = require('./RSModel');
const dokter = require('./dokterModel');



// fungsi for tambah user baru (nd dengan rekam medis)
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
            message: `Failed creating new.`,
            desc: e.message,
        });
    }
};



module.exports = {
    createUser,
};
