const mongoose = require("mongoose");
const Bill = require("./Bill");

const WarrentySchema = new mongoose.Schema(
  {
    warrentyNo: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    billNo: { type: String, required: true },
    billID: { type: mongoose.SchemaTypes.ObjectId, ref: "Bill" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warrenty", WarrentySchema);
