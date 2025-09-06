const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: [true, "Pleasse provide user id"],
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

module.exports = mongoose.model("UserToken", userTokenSchema);