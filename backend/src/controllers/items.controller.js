const ItemModel = require("../models/item.model.js");
const PartnerModel = require("../models/foodpartner.model.js");
const ProductModel = require("../models/product.model.js");
const BadRequestError = require("../erros/badrequest.error.js");
const UnauthenticatedError = require("../erros/unauthenticated.error.js");
const { uploadFile } = require("../services/storage.services.js");
const { v4: uuid } = require("uuid");

const createItem = async (req, res) => {
  const product = await ProductModel.findById(req.body.productId);

  if (!product) {
    throw new BadRequestError("No product assiciated with this id");
    return;
  }

  const videoUploadResult = await uploadFile(req.files.video[0].buffer, uuid());
  const thumbnailUploadResult = await uploadFile(
    req.files.thumbnail[0].buffer,
    uuid(),
  );

  const item = await ItemModel.create({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    video: videoUploadResult.url,
    videoFileId: videoUploadResult.fileId,
    thumbnail: thumbnailUploadResult.url,
    thumbnailFieldId: thumbnailUploadResult.fileId,
    createdBy: req.partner._id,
    category: req.body.category,
    likes: 0,
    saves: 0,
    productId: req.body.productId,
  });

  console.log(item);

  res.status(201).json({
    message: "item created successfully",
    item,
  });
};

const getItems = async (req, res) => {
  const items = await ItemModel.find({});
  res.status(200).json({
    message: "items fetched",
    items,
  });
};

const getReelsByPartner = async (req, res) => {
  const partner = await PartnerModel.findOne({ _id: req.params.id });

  if (!partner) {
    throw new BadRequestError("partner not found");
  }

  const reels = await ItemModel.find({ createdBy: partner._id });

  res.status(200).json({ message: "items fetched", reels });
};

module.exports = {
  createItem,
  getItems,
  getReelsByPartner,
};
