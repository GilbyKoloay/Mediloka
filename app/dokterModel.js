const mongoose = require('mongoose');

const dokterSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, "'nama' tidak boleh kosong"],
    },
    spesialisasi: {
        spesialis: {
            type: String,
            default: null,
        },
        singkatan: {
            type: String,
            default: null,
        },
    },
    poli: {
        type: String,
        default: null,
    },
    praktek: [{
        namaRS: {
            type: String,
            default: null,
        },
        lokasi: {
            type: String,
            default: null,
        },
        jadwal: {
            senin: [{
                type: Array,
            }],
            selasa: [{
                type: Array,
            }],
            rabu: [{
                type: Array,
            }],
            kamis: [{
                type: Array,
            }],
            jumat: [{
                type: Array,
            }],
            sabtu: [{
                type: Array,
            }],
            minggu: [{
                type: Array,
            }],
        },
    }],
    informasiTerkait: {
        type: String,
        default: null,
    }
}, {collection: 'dokter'});

module.exports = mongoose.model('dokter', dokterSchema);
