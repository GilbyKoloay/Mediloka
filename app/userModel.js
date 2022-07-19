const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "'email' tidak boleh kosong"],
    },
    password: {
        type: String,
        required: [true, "'password' tidak boleh kosong"],
    },
    nama: {
        type: String,
        required: [true, "'nama' tidak boleh kosong"],
    },
    tempatLahir: {
        type: String,
        required: [true, "'tempat lahir' tidak boleh kosong"],
    },
    tanggalLahir: {
        type: Date,
        required: [true, "'tanggal lahir' tidak boleh kosong"],
    },
    jenisKelamin: {
        type: String,
        enum: ['Laki-Laki', 'Perempuan'],
        required: [true, "'jenis kelamin' tidak boleh kosong"],
    },
    rekamMedis: [{
        tanggalPeriksa: {
            type: Date,
            required: [true, "'tanggal periksa' tidak boleh kosong"],
        },
        keluhan: [{
            type: String,
            default: null,
        }],
        diagnosa: [{
            type: String,
            default: null,
        }],
        tindakan: [{
            type: String,
            default: null,
        }],
        keadaanKeluar: {
            type: String,
            enum: ['Sembuh', 'Belum Sembuh', 'Meninggal'],
            default: null,
        },
        caraKeluar: {
            type: String,
            enum: ['Diijinkan Pulang', 'Lari', 'Pindah Rumah Sakit', 'Pulang Paksa', 'Dirujuk'],
            default: null,
        },
    }]
});

module.exports = mongoose.model('users', userSchema);
