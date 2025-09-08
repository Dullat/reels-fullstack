const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  getReelsByPartner,
} = require("../controllers/items.controller.js");
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
  .post(
    authPartnerMiddleware,
    upload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    createItem,
  )
  .get(getItems);

router.route("/bypartner/:id").get(getReelsByPartner);

module.exports = router;
