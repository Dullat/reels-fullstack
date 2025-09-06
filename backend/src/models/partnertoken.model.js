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
        expires: 60 * 60 * 24 * 7,
    },
});

module.exports = mongoose.model("PartnerToken", partnerTokenSchema);