const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorized,
} = require("../middleware/verifyToken");
const Bill = require("../models/Bill");

router.get("/getbill", (req, res) => {
  res.send("user data recived");
});

router.post("/addbill", async (req, res) => {
  const newbill = new Bill({
    billNo: req.body.billNo,
    amount: req.body.amount,
    address: req.body.address,
  });

  try {
    const saveduser = await newbill.save();
    res.status(200).json(saveduser);
  } catch (e) {
    return res.status(501).json(e.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatebill = await bill.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json(updatebill);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

module.exports = router;
