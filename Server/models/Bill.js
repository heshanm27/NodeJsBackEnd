const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    billNo: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    address: { type: String, default: false },
    warrentyID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Warrenty",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema);
