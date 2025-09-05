const express = require("express");
const { updateProfileImage } = require("../controllers/profile.controller.js");
const {serveProfile} = require("../controllers/profile.controller.js");
const { authPartnerMiddleware } = require("../middleware/auth.middleware.js");
const multer = require("multer");   

const router = express.Router();

// muler
const upload = multer({
  storage: multer.memoryStorage(),
});

router.route("/:userId").get(serveProfile);
router.route("/update/profileimage").post(authPartnerMiddleware, upload.single("image"), updateProfileImage);

module.exports = router;