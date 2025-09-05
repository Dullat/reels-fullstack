const ItemModel = require("../models/item.model.js");
const { uploadFile } = require("../services/storage.services.js");
const { v4: uuid } = require("uuid");

const createItem = async (req, res) => {
  const fileUploadResult = await uploadFile(req.file.buffer, uuid());

  const item = await ItemModel.create({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    video: fileUploadResult.url,
    fileId: fileUploadResult.fileId,
    createdBy: req.partner._id,
    category: req.body.category,
    likes: 0,
    saves: 0,
    productId: req.body.productId,
  });

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

module.exports = {
  createItem,
  getItems,
};
