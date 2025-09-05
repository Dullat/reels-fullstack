const express = require("express");
const router = express.Router();
const { createProduct, getProducts, getAllProducts, getOneProduct } = require("../controllers/product.controller.js");
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
    .post(authPartnerMiddleware, upload.single("image"), createProduct)
    
router.route("/bypartner/:id").get(getProducts);
router.route("/").get(getAllProducts);
router.route("/:id").get(getOneProduct);
module.exports = router;