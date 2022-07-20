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

// update user data (nd pke medical record)
const updateUser = async(req, res, next) => {
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
                message: `Success to update user data.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed to update user data.`,
            desc: e.message,
        });
    }
};

// tambah rekam medis di user
const createUserRM = async(req, res, next) => {
    try {
        const exist = await user.find({
            _id: req.body._id,
        });

        if(exist.length === 0) {
            res.send({
                status: `Error`,
                message: `Failed adding new medical record.`,
                desc: `User does not exist.`,
            });
        }
        else if(exist.length > 0) {
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
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed adding new medical record.`,
            desc: e.message,
        });
    }
};



// ====================================================================================================



// ambil semua data dokter
const allDokter = async(req, res, next) => {
    try {
        const result = await dokter.find();

        res.send({
            status: `Success`,
            message: `Success getting all doctors data.`,
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed getting all doctors data.`,
            desc: e.message,
        });
    }
};

// tambah dokter (tanpa praktek)
const createDokter = async(req, res, next) => {
    try {
        const exist = await dokter.find({
            nama: req.body.nama,
        });

        if(exist.length > 0) {
            res.send({
                status: `Error`,
                message: `Failed creating new doctor.`,
                desc: `Doctor already exist.`,
            });
        }
        else if(exist.length === 0) {
            const result = await dokter.create({
                nama: req.body.nama,
                spesialisasi: {
                    spesialis: req.body.spesialis,
                    singkatan: req.body.singkatan,
                },
                informasiTerkait: req.body.informasiTerkait,
            });

            res.send({
                status: `Success`,
                message: `Success creating new doctor.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed creating new doctor.`,
            desc: e.message,
        });
    }
};

// update dokter (tanpa jadwal praktek)
const updateDokter = async(req, res, next) => {
    try {
        const exist = await dokter.find({
            _id: req.body._id,
        });

        if(exist.length === 0) {
            res.send({
                status: `Error`,
                message: `Failed to update doctor data.`,
                desc: `Doctor not found.`
            });
        }
        else if(exist.length > 0) {
            const result = await dokter.updateOne({
                _id: req.body._id,
            }, {
                nama: req.body.nama,
                spesialisasi: {
                    spesialis: req.body.spesialis,
                    singkatan: req.body.singkatan,
                },
                informasiTerkait: req.body.informasiTerkait,
            });
    
            res.send({
                status: `Success`,
                message: `Success to update doctor data.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed to update doctor data.`,
            desc: e.message,
        });
    }
};

// menambahkan jadwal praktek dokter
const createDokterP = async(req, res, next) => {
    try {
        const exist = await dokter.find({
            _id: req.body._id,
        });
        
        if(exist.length === 0) {
            res.send({
                status: `Error`,
                message: `Failed adding schedule.`,
                desc: `Doctor does not exist.`,
            });
        }
        else if(exist.length > 0) {
            const result = await dokter.updateOne({
                _id: req.body._id,
            }, {
                $push: {
                    praktek: {
                        namaRS: req.body.namaRS,
                        lokasi: req.body.lokasi,
                        jadwal: {
                            // senin: [[9, 30], [10, 30]],
                            // senin: [[jam mulai, menit mulai], [jam selesai, menit selesai]],
                            senin: req.body.senin,
                            selasa: req.body.selasa,
                            rabu: req.body.rabu,
                            kamis: req.body.kamis,
                            jumat: req.body.jumat,
                            sabtu: req.body.sabtu,
                            minggu: req.body.minggu,
                        },
                    },
                },
            });

            res.send({
                status: `Success`,
                message: `Success adding schedule.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed adding schedule.`,
            desc: e.message,
        });
    }
};



module.exports = {
    allUser,
    createUser,
    updateUser,
    createUserRM,

    allDokter,
    createDokter,
    updateDokter,
    createDokterP,
};
