const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorized,
} = require("../middleware/verifyToken");
const Warrenty = require("../models/Warrenty");
const Bill = require("../models/Bill");

router.get("/getbill", (req, res) => {
  res.send("user data recived");
});

router.post("/addwarrenty", async (req, res) => {
  try {
    //find crospond bill
    const BillNo = await Bill.findOne({ billNo: req.body.billNo });
    const { _id, billNo, ...others } = BillNo._doc;

    //add new bill
    const newWarrenty = new Warrenty({
      billID: _id,
      billNo: billNo,
      price: req.body.price,
      warrentyNo: req.body.warrentyNo,
    });
    //add warrentyID to bill
    const updatedBill = await Bill.findByIdAndUpdate(_id, {
      $set: { warrentyID: newWarrenty._id },
    });

    //save
    const saveduser = await newWarrenty.save();

    res.status(200).json(saveduser);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

module.exports = router;
