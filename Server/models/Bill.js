const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    billNo: { type: String, required: true, unique: true },
    amount: { type: number, required: true },
    address: { type: String, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema);
