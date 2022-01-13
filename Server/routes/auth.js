const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_SEC
    ).toString(),
  });

  newUser
    .save()
    .then(() => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.status(500).json("Please Fill Form ");
    });
});

//user login
router.post("/login", async (req, res) => {
  try {
    //search if any user has email in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json("User Does Not Exist");
      return;
    }

    //decrypt found user password
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SEC
    );
    const Originalpassword = hashPassword.toString(CryptoJS.enc.Utf8);

    //check password validty
    if (Originalpassword !== req.body.password) {
      res.status(401).json("Wrong Credentials");
      return;
    }

    //create jwt token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    //send response with user object and jwt token
    res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
