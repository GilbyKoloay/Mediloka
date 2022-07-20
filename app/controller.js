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
                email: (req.body.email !== undefined) && req.body.email,
                password: (req.body.password !== undefined) && req.body.password,
                nama: (req.body.nama !== undefined) && req.body.nama,
                tempatLahir: (req.body.tempatLahir !== undefined) && req.body.tempatLahir,
                tanggalLahir: (req.body.tahunLahir !== undefined) && new Date(`${req.body.tahunLahir}-${(parseInt(req.body.bulanLahir) < 10) ? `0${parseInt(req.body.bulanLahir)}` : req.body.bulanLahir}-${(parseInt(req.body.tanggalLahir) < 10) ? `0${parseInt(req.body.tanggalLahir)}` : req.body.tanggalLahir}`),
                jenisKelamin: (req.body.jenisKelamin !== undefined) && req.body.jenisKelamin,
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

// cek kalo user terdaftar (autentikasi login)
const userLogin = async(req, res, next) => {
    try {
        const result = await user.findOne({
            email: req.query.email,
            password: req.query.password,
        });

        if(result === null) {
            res.send({
                status: `Error`,
                message: `Failed to login.`,
                desc: `User not found`,
            });
        }
        else if(result !== null) {
            res.send({
                status: `Success`,
                message: `Success to login.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed to login.`,
            desc: e.message,
        });
    }
}



// ====================================================================================================
// ====================================================================================================
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
                nama: (req.body.nama !== undefined) && req.body.nama,
                spesialisasi: {
                    spesialis: (req.body.spesialis !== undefined) && req.body.spesialis,
                    singkatan: (req.body.singkatan !== undefined) && req.body.singkatan,
                },
                informasiTerkait: (req.body.informasiTerkait !== undefined) && req.body.informasiTerkait,
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

// mengupdate jadwal praktek dokter
const updateDokterP = async(req, res, next) => {
    try {
        const exist = await dokter.find({
            _id: req.body._id,
        });

        if(exist.length === 0) {
            res.send({
                status: `Error`,
                message: `Failed modifying doctor's schedule.`,
                desc: `Doctor not found.`,
            });
        }
        else if(exist.length > 0) {
            const result = await dokter.updateOne({
                _id: req.body._id,
                "praktek.namaRS": req.body.namaRS,
            }, {
                $set: {
                    "praktek.$.lokasi": req.body.lokasi,
                    "praktek.$.jadwal": {
                        // senin: [[15, 30], [16, 30]],
                        // senin: [[jam mulai, menit mulai], [jam selesai, menit selesai]],
                        senin: req.body.senin,
                        selasa: req.body.selasa,
                        rabu: req.body.rabu,
                        kamis: req.body.kamis,
                        jumat: req.body.jumat,
                        sabtu: req.body.sabtu,
                        minggu: req.body.minggu,
                    }
                }
            });
            
            if(result.matchedCount === 0) {
                res.send({
                    status: `Error`,
                    message: `Failed modifying doctor's schedule.`,
                    desc: `${req.body.namaRS} not found in doctor's schedule.`,
                });
            }
            else {
                res.send({
                    status: `Success`,
                    message: `Success modifying doctor's schedule.`,
                    desc: result,
                });
            }
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed modifying doctor's schedule.`,
            desc: e.message,
        });
    }
};



// ====================================================================================================
// ====================================================================================================
// ====================================================================================================



// ambil semua data RS
const allRS = async(req, res, next) => {
    try {
        const result = await RS.find();

        res.send({
            status: `Success`,
            message: `Success getting all hospitals data.`,
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Error getting all hospitals data.`,
            desc: e.message,
        });
    }
};

// buat RS baru
const createRS = async(req, res, next) => {
    try {
        const exist = await RS.find({
            nama: req.body.nama,
        });

        if(exist.length > 0) {
            res.send({
                status: `Error`,
                message: `Failed creating new hospital.`,
                desc: `Hospital name already exist.`,
            });
        }
        else if(exist.length === 0) {
            const result = await RS.create({
                nama: req.body.nama,
                lokasi: req.body.lokasi,
            });

            res.send({
                status: `Success`,
                message: `Success creating new hospital.`,
                desc: result,
            });
        }
        
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed creating new hospital.`,
            desc: e.message,
        });
    }
};

// upadte jumlah kasur
const updateRSKasur = async(req, res, next) => {
    try {
        const exist = await RS.find({
            _id: req.body._id,
        });

        if(exist.length === 0) {
            res.send({
                status: `Error`,
                message: `Failed updating hospital's bed.`,
                desc: `Hospital does not exist.`,
            });
        }
        else if(exist.length > 0) {
            const result = await RS.updateOne({
                _id: req.body._id,
            }, {
                jumlahKasur: {
                    ICU: {
                        Nyiur: {
                            tersedia: (req.body.ICU.Nyiur[0] !== undefined) && req.body.ICU.Nyiur[0],
                            digunakan: (req.body.ICU.Nyiur[1] !== undefined) && req.body.ICU.Nyiur[1],
                        },
                        Anggrek_I: {
                            tersedia: (req.body.ICU.Anggrek_I[0] !== undefined) && req.body.ICU.Anggrek_I[0],
                            digunakan: (req.body.ICU.Anggrek_I[1] !== undefined) && req.body.ICU.Anggrek_I[1],
                        },
                        IRINA_B: {
                            tersedia: (req.body.ICU.IRINA_B[0] !== undefined) && req.body.ICU.IRINA_B[0],
                            digunakan: (req.body.ICU.IRINA_B[1] !== undefined) && req.body.ICU.IRINA_B[1],
                        }
                    },
                    SVIP: {
                        Nyiur: {
                            tersedia: (req.body.SVIP.Nyiur[0] !== undefined) && req.body.SVIP.Nyiur[0],
                            digunakan: (req.body.SVIP.Nyiur[1] !== undefined) && req.body.SVIP.Nyiur[1],
                        },
                        Anggrek_I: {
                            tersedia: (req.body.SVIP.Anggrek_I[0] !== undefined) && req.body.SVIP.Anggrek_I[0],
                            digunakan: (req.body.SVIP.Anggrek_I[1] !== undefined) && req.body.SVIP.Anggrek_I[1],
                        },
                        IRINA_B: {
                            tersedia: (req.body.SVIP.IRINA_B[0] !== undefined) && req.body.SVIP.IRINA_B[0],
                            digunakan: (req.body.SVIP.IRINA_B[1] !== undefined) && req.body.SVIP.IRINA_B[1],
                        }
                    },
                    VIP: {
                        Nyiur: {
                            tersedia: (req.body.VIP.Nyiur[0] !== undefined) && req.body.VIP.Nyiur[0],
                            digunakan: (req.body.VIP.Nyiur[1] !== undefined) && req.body.VIP.Nyiur[1],
                        },
                        Anggrek_I: {
                            tersedia: (req.body.VIP.Anggrek_I[0] !== undefined) && req.body.VIP.Anggrek_I[0],
                            digunakan: (req.body.VIP.Anggrek_I[1] !== undefined) && req.body.VIP.Anggrek_I[1],
                        },
                        IRINA_B: {
                            tersedia: (req.body.VIP.IRINA_B[0] !== undefined) && req.body.VIP.IRINA_B[0],
                            digunakan: (req.body.VIP.IRINA_B[1] !== undefined) && req.body.VIP.IRINA_B[1],
                        }
                    },
                    KelasI: {
                        Nyiur: {
                            tersedia: (req.body.KelasI.Nyiur[0] !== undefined) && req.body.KelasI.Nyiur[0],
                            digunakan: (req.body.KelasI.Nyiur[1] !== undefined) && req.body.KelasI.Nyiur[1],
                        },
                        Anggrek_I: {
                            tersedia: (req.body.KelasI.Anggrek_I[0] !== undefined) && req.body.KelasI.Anggrek_I[0],
                            digunakan: (req.body.KelasI.Anggrek_I[1] !== undefined) && req.body.KelasI.Anggrek_I[1],
                        },
                        IRINA_B: {
                            tersedia: (req.body.KelasI.IRINA_B[0] !== undefined) && req.body.KelasI.IRINA_B[0],
                            digunakan: (req.body.KelasI.IRINA_B[1] !== undefined) && req.body.KelasI.IRINA_B[1],
                        }
                    },
                    KelasII: {
                        Nyiur: {
                            tersedia: (req.body.KelasII.Nyiur[0] !== undefined) && req.body.KelasII.Nyiur[0],
                            digunakan: (req.body.KelasII.Nyiur[1] !== undefined) && req.body.KelasII.Nyiur[1],
                        },
                        Anggrek_I: {
                            tersedia: (req.body.KelasII.Anggrek_I[0] !== undefined) && req.body.KelasII.Anggrek_I[0],
                            digunakan: (req.body.KelasII.Anggrek_I[1] !== undefined) && req.body.KelasII.Anggrek_I[1],
                        },
                        IRINA_B: {
                            tersedia: (req.body.KelasII.IRINA_B[0] !== undefined) && req.body.KelasII.IRINA_B[0],
                            digunakan: (req.body.KelasII.IRINA_B[1] !== undefined) && req.body.KelasII.IRINA_B[1],
                        }
                    },
                    KelasIII: {
                        Nyiur: {
                            tersedia: (req.body.KelasIII.Nyiur[0] !== undefined) && req.body.KelasIII.Nyiur[0],
                            digunakan: (req.body.KelasIII.Nyiur[1] !== undefined) && req.body.KelasIII.Nyiur[1],
                        },
                        Anggrek_I: {
                            tersedia: (req.body.KelasIII.Anggrek_I[0] !== undefined) && req.body.KelasIII.Anggrek_I[0],
                            digunakan: (req.body.KelasIII.Anggrek_I[1] !== undefined) && req.body.KelasIII.Anggrek_I[1],
                        },
                        IRINA_B: {
                            tersedia: (req.body.KelasIII.IRINA_B[0] !== undefined) && req.body.KelasIII.IRINA_B[0],
                            digunakan: (req.body.KelasIII.IRINA_B[1] !== undefined) && req.body.KelasIII.IRINA_B[1],
                        }
                    },
                },
            });

            res.send({
                status: `Success`,
                message: `Success updating hospital's bed.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed updating hospital's bed.`,
            desc: e.message,
        });
    }
};

// update darah di RS
const updateRSDarah = async(req, res, next) => {
    try {
        const exist = await RS.find({
            _id: req.body._id,
        });

        if(exist.length === 0) {
            res.send({
                status: `Error`,
                message: `Failed updating blood.`,
                desc: `Hospital not found.`,
            });
        }
        else if(exist.length > 0) {
            const result = await RS.updateOne({
                _id: req.body._id,
            }, {
                darah: {
                    A_Plus: (req.body.A_Plus !== undefined) && parseInt(req.body.A_Plus),
                    A_Min: (req.body.A_Min !== undefined) && parseInt(req.body.A_Min),
                    B_Plus: (req.body.B_Plus !== undefined) && parseInt(req.body.B_Plus),
                    B_Min: (req.body.B_Min !== undefined) && parseInt(req.body.B_Min),
                    O_Plus: (req.body.O_Plus !== undefined) && parseInt(req.body.O_Plus),
                    O_Min: (req.body.O_Min !== undefined) && parseInt(req.body.O_Min),
                    AB_Plus: (req.body.AB_Plus !== undefined) && parseInt(req.body.AB_Plus),
                    AB_Min: (req.body.AB_Min !== undefined) && parseInt(req.body.AB_Min),
                }
            });

            res.send({
                status: `Success`,
                message: `Success updating blood.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed updating blood.`,
            desc: e.message,
        });
    }
};

// tambah ambulance
const createRSAmbulans = async(req, res, next) => {
    try {
        const exist = await RS.find({
            _id: req.body._id,
        });

        if(exist.length === 0) {
            res.send({
                status: `Error`,
                message: `Failed creating new ambulance.`,
                desc: `Hospital does not exist.`,
            });
        }
        else if(exist.length > 0) {
            const result = await RS.updateOne({
                _id: req.body._id,
            }, {
                $push: {
                    ambulans: {
                        tersedia: req.body.tersedia,
                        lokasi: req.body.lokasi,
                    },
                },
            });

            res.send({
                status: `Success`,
                message: `Success creating new ambulance.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed creating new ambulance.`,
            desc: e.message,
        });
    }
};

// update ambulans
const updateRSAmbulans = async(req, res, next) => {
    try {
        const exist = await RS.find({
            _id: req.body._id,
        });

        if(exist.length === 0) {
            res.send({
                status: `Error`,
                message: `Failed updating ambulance data.`,
                desc: `Hospital does not exist.`,
            });
        }
        else if(exist.length > 0) {
            const result = await RS.updateOne({
                _id: req.body._id,
                "ambulans._id": req.body._idAmbulans,
            }, {
                $set: {
                    "ambulans.$.tersedia": req.body.tersedia,
                    "ambulans.$.lokasi": req.body.lokasi,
                },
            });

            res.send({
                status: `Success`,
                message: `Success upadting ambulance data.`,
                desc: result,
            });
        }
    }
    catch(e) {
        res.send({
            status: `Error`,
            message: `Failed updating ambulance data.`,
            desc: e.message,
        });
    }
};



module.exports = {
    allUser,
    createUser,
    updateUser,
    createUserRM,
    userLogin,

    allDokter,
    createDokter,
    updateDokter,
    createDokterP,
    updateDokterP,

    allRS,
    createRS,
    updateRSKasur,
    updateRSDarah,
    createRSAmbulans,
    updateRSAmbulans,
};
