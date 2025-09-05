const { unauthenticatedError } = require("../erros/unauthenticated.error.js");
const PartnerModel = require("../models/foodpartner.model.js");
const { uploadFile } = require("../services/storage.services.js");
const { v4: uuid } = require("uuid");

const serveProfile = async (req, res) => {
    const { userId } = req.params;

    const partner = await PartnerModel.findById(userId);
    if (!partner) {
        throw new unauthenticatedError("unauthenticated");
    }
    res.status(200).json({
        message: "profile fetched",
        partner,
    });
};

const updateProfileImage = async (req, res) => {
    console.log(req.file.buffer)
    const result = await uploadFile(req.file.buffer, uuid());

    try {
        const partner = await PartnerModel.updateOne(
            { _id: req.partner._id },
            { $set: { imageUrl: result.url } }
        );
        res.status(200).json({
            message: "profile image updated",
            partner
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    serveProfile,
    updateProfileImage
};