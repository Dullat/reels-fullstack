const ProductModel = require("../models/product.model.js");
const BadRequestError = require("../erros/badrequest.error.js");
const { uploadFile } = require("../services/storage.services.js");
const { v4: uuid } = require("uuid");

const createProduct = async (req, res) => {
    console.log(req.file.buffer)
    if (!req.file) {
        throw new BadRequestError("Please provide image")
    }
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());

    const product = await ProductModel.create({
        name: req.body.name,
        imageUrl: fileUploadResult.url,
        description: req.body.description,
        fileId: fileUploadResult.fileId,
        createdBy: req.partner._id,
        category: req.body.category,
        price: req.body.price,
    });

    res.status(201).json({
        message: "item created successfully",
        product,
    });
};

const getProducts = async (req, res) => {
    const { id: partnerId } = req.params
    console.log(partnerId)
    const products = await ProductModel.find({createdBy: partnerId});
    res.status(200).json({
        message: "items fetched",
        products,
    });
};

const getAllProducts = async (req, res) => {
    const products = await ProductModel.find({});
    res.status(200).json({
        message: "items fetched",
        products,
    });
};

const getOneProduct = async (req, res) => {
    const { id } = req.params
    const product = await ProductModel.findById(id);
    res.status(200).json({
        message: "items fetched",
        product,
    });
};

module.exports = {
    createProduct,
    getProducts,
    getAllProducts,
    getOneProduct
};
