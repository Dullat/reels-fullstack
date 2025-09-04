const express = require("express");
const router = express.Router();
const { createItem, getItems } = require("../controllers/items.controller.js");
const {
  authPartnerMiddleware,
  authUserMiddleware,
} = require("../middleware/auth.middleware.js");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router
  .route("/")
  .post(authPartnerMiddleware, upload.single("video"), createItem)
  .get(authUserMiddleware, getItems);

module.exports = router;
