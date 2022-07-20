const mongoose = require('mongoose');

const RSSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, "'nama' tidak boleh kosong"],
    },
    lokasi: {
        type: String,
        required: [true, "'lokasi' tidak boleh kosong"],
    },
    jumlahKasur: {
        ICU: {
            Nyiur: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            Anggrek_I: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            IRINA_B: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            }
        },
        SVIP: {
            Nyiur: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            Anggrek_I: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            IRINA_B: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            }
        },
        VIP: {
            Nyiur: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            Anggrek_I: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            IRINA_B: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            }
        },
        KelasI: {
            Nyiur: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            Anggrek_I: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            IRINA_B: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            }
        },
        KelasII: {
            Nyiur: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            Anggrek_I: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            IRINA_B: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            }
        },
        KelasIII: {
            Nyiur: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            Anggrek_I: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            },
            IRINA_B: {
                tersedia: {
                    type: Number,
                    default: null,
                },
                digunakan: {
                    type: Number,
                    default: null,
                }
            }
        }
    },
    darah: {
        A_Plus: {
            type: Number,
            default: null,
        },
        A_Min: {
            type: Number,
            default: null,
        },
        B_Plus: {
            type: Number,
            default: null,
        },
        B_Min: {
            type: Number,
            default: null,
        },
        O_Plus: {
            type: Number,
            default: null,
        },
        O_Min: {
            type: Number,
            default: null,
        },
        AB_Plus: {
            type: Number,
            default: null,
        },
        AB_Min: {
            type: Number,
            default: null,
        }
    },
    ambulans: [{
        tersedia: {
            type: Boolean,
            default: null,
        },
        lokasi: {
            type: String,
            default: null,
        }    
    }]
}, {collection: 'RS'});

module.exports = mongoose.model('RS', RSSchema);
