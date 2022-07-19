const mongoose = require('mongoose');

const dokterSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, "'nama' tidak boleh kosong"],
    },
    spesialisasi: {
        type: String,
        default: null,
    },
    jabatan: {
        type: String,
        default: null,
    },
    praktek: [{
        lokasi: {
            type: String,
            default: null,
        },
        jadwal: [{
            senin: {
                type: Number,
                default: null,
            },
            selasa: {
                type: Number,
                default: null,
            },
            rabu: {
                type: Number,
                default: null,
            },
            kamis: {
                type: Number,
                default: null,
            },
            jumat: {
                type: Number,
                default: null,
            },
            sabtu: {
                type: Number,
                default: null,
            },
            minggu: {
                type: Number,
                default: null,
            }
        }],
    }],
    informasiTerkait: {
        type: String,
        default: null,
    }
});

module.exports = mongoose.model('dokter', dokterSchema);
