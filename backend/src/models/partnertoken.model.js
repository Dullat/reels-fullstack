const mongoose = require("mongoose");

const partnerTokenSchema = new mongoose.Schema({
    partnerId: {
        type: mongoose.Types.ObjectId,
        ref: "Partner",
        required: [true, "Pleasse provide partner id"],
    },
    refreshToken: {
        type: String,
        required: [true, "Pleasse provide token"],
    },
    userAgent: {
        type: String,
        required: [true, "Pleasse provide user agent"],
    },
    ip: {
        type: String,
        required: [true, "Pleasse provide ip"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    lastUsed: {
        type: Date,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: {expires: 0}
    },
    isValid: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("PartnerToken", partnerTokenSchema);