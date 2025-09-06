require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plz provide a name"],
    },
    phone: {
      type: String,
      required: [true, "Plz provide a phone"],
    },
    address: {
      type: String,
      required: [true, "Plz provide an address"],
    },
    email: {
      type: String,
      required: [true, "Plz provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Plz provide a pass"],
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamp: true,
  },
);

foodPartnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

foodPartnerSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    },
  );
};
foodPartnerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("partner", foodPartnerSchema);
