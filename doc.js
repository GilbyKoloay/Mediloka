// GET - allUser
// mo ambe data semua user

// POST - createUser
// mo tambah user baru (nd dengan rekam medis)
// parameter (semua musti isi):
{
    email: // string
    password: // string
    nama: // string
    tempatLahir: // string
    tahunLahir: // string / integer
    bulanLahir: // string / integer
    tanggalLahir: // string / integer
    jenisKelamin: // string (Laki-Laki / Perempuan)
}

// PUT - updateUser
// update user p data (nd dengan rekam medis)
// parameter (nd msti isi smua):
{
    _id: // string (_id dari itu user yg m diganti)
    email: // string
    password: // string
    nama: // string
    tempatLahir: // string
    tahunLahir: // string / integer
    bulanLahir: // string / integer
    tanggalLahir: // string / integer
    jenisKelamin: // string (Laki-Laki / Perempuan)
}

// POST - createUserRM
// tambah user p rekam medis
// parameter (nd msti isi smua, kcuali 'keadaanKeluar & caraKeluar'. itu tanggal nnti backend yg isi sndri):
{
    _id: // string (_id dari itu user yg m tambah dpe rekam medis)
    keluhan: // string array. ex: ["keluhan 1", "keluhan 2"]
    diagnosa: // string array
    tindakan: // string array
    keadaanKeluar: // string (Sembuh / Belum Sembuh / Meinggal)
    caraKeluar: // string (Diijinkan Pulang / Lari / Pindah Rumah Sakit / Pulang Paksa / Dirujuk)
}

// GET - allDokter
// ambil semua dokter p data

// POST - createDokter
// tambah dokter baru
// parameter: (isi j 'nama', 'spesialis', 'singkatan', dgn 'informasiTerkait', dpe lain se kosong):
{
    nama: // string
    spesialis: // string (THT)
    singkatan: // string (SpTHT [ini tu yg m taru dsblh nama, rupa gelar bgtu])
    informasiTerkait: // string
}

// PUT - updateDokter
// ubah dokter p data for nama, spesialis, singkatan dgn informasi terkait
// paramter (rupa di POST - createDokter, cmn itu nama, spesialis, singkatan dg informasi terkait blh nd isi. isi j yg m diubah):
{
    _id: // string (_id dari itu dokter yg m diganti)
    nama: // string
    spesialis: // string (THT)
    singkatan: // string (SpTHT [ini tu yg m taru dsblh nama, rupa gelar bgtu])
    informasiTerkait: // string
}

// POST - createDokterP
// tambah dokter p jadwal
// paramter (msti isi smua):
{
    _id: // string (_id dari itu dokter yg m tambah dpe jadwal)
    namaRS: // string (nama RS yg tu dokter m kerja akng)
    lokasi: // string (lokasi dari RS yg dokter m kerja akng)
    senin: // array (jam mulai dg jam selesai kerja. ex. senin: [[9, 30], [10, 30]] -> mulai kerja dari jam 9.30 smpe jam 10.30)
    selasa: // array (sma dg tu hari senin dpe cara b input)
    rabu: // array (sma dg tu hari senin dpe cara b input)
    kamis: // array (sma dg tu hari senin dpe cara b input)
    jumat: // array (sma dg tu hari senin dpe cara b input)
    sabtu: // array (sma dg tu hari senin dpe cara b input)
    minggu: // array (sma dg tu hari senin dpe cara b input)
}

// PUT - updateDokterP
// update dokter p data praktek. m diubah berdasarkan nama RS yg se maso. klo se maso RS A, berarti m ubah jadwal kerja di RS A.
// parameter (musti isi itu _id dg namaRS, dpe lain blh kosong):
{
    _id: // string (_id dari itu dokter yg m tambah dpe jadwal)
    namaRS: // string (nama RS yg tu dokter m kerja akng)
    lokasi: // string (lokasi dari RS yg dokter m kerja akng)
    senin: // array (jam mulai dg jam selesai kerja. ex. senin: [[9, 30], [10, 30]] -> mulai kerja dari jam 9.30 smpe jam 10.30)
    selasa: // array (sma dg tu hari senin dpe cara b input)
    rabu: // array (sma dg tu hari senin dpe cara b input)
    kamis: // array (sma dg tu hari senin dpe cara b input)
    jumat: // array (sma dg tu hari senin dpe cara b input)
    sabtu: // array (sma dg tu hari senin dpe cara b input)
    minggu: // array (sma dg tu hari senin dpe cara b input)
}

// GET - allRS
// for ambe semua data rumah sakit

// POST - createRS
// bking RS baru
// parameter (msti isi smua). dpe ruangan & darah m tbking sndri dgn nilai null
{
    nama: // string
    lokasi: // string
}

// PUT - updateRSKasur
// update jumlah kasur di RS
// parameter (_id msti isi, dpe lain blh kosong)
{
    _id: // string (_id dari itu RS yg m ubah dpe data)
    ICU: {
        Nyiur: // array (index 0 for jmlh darah yg tersedia, index 1 for jmlh darah yg digunakan. ex. Nyiur: [20, 10])
        Anggrek_I: // array (sma dg Nyiur)
        IRINA_B: // array (sma dg Nyiur)
    },
    SVIP: {
        Nyiur: // array (sma dg Nyiur)
        Anggrek_I: // array (sma dg Nyiur)
        IRINA_B: // array (sma dg Nyiur)
    },
    VIP: {
        Nyiur: // array (sma dg Nyiur)
        Anggrek_I: // array (sma dg Nyiur)
        IRINA_B: // array (sma dg Nyiur)
    },
    KelasI: {
        Nyiur: // array (sma dg Nyiur)
        Anggrek_I: // array (sma dg Nyiur)
        IRINA_B: // array (sma dg Nyiur)
    },
    KelasII: {
        Nyiur: // array (sma dg Nyiur)
        Anggrek_I: // array (sma dg Nyiur)
        IRINA_B: // array (sma dg Nyiur)
    },
    KelasIII: {
        Nyiur: // array (sma dg Nyiur)
        Anggrek_I: // array (sma dg Nyiur)
        IRINA_B: // array (sma dg Nyiur)
    }
}

// PUT - updateRSDarah
// update data darah di RS
// parameter (_id msti isi, dpe lain blh kosong)
{
    _id: // string (_id dari itu rumah sakit)
    A_Plus: // integer
    A_Min: // integer
    B_Plus: // integer
    B_Min: // integer
    O_Plus: // integer
    O_Min: // integer
    AB_Plus: // integer
    AB_Min: // integer
}

// POST - createRSAmbulans
// for m tambah ambulans di suatu rumah sakit
// parameter (msti isi smua):
{
    _id: // string (_id dari rumah sakit yg m tmbh tu ambulans)
    tersedia: // boolean (true kalo ambulans lagi dipake, false klo ambulans lagi nd dipake)
    lokasi: // string
}

// PUT - updateRSAmbulans
// mo update ambulans p data
// parameter (_id dgn _idAmbulans msti isi, lain blh kosong)
{
    _id: // string (_id dari rumah sakit yg m tmbh tu ambulans)
    _idAmbulans: // string (_id dari ambulans yg m ganti dpe data)
    tersedia: // boolean (true kalo ambulans lagi dipake, false klo ambulans lagi nd dipake)
    lokasi: // string
}
