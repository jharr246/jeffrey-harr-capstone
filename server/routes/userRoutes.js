const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//create user
router.post("/", async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 8);
  if (password) {
    const user = await new User({
      ...req.body,
      password,
    }).save();
    const token = jwt.sign(
      { id: user.id, email: user.attributes.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    return res.status(201).json({ user, token });
  }
  return res
    .status(400)
    .json({ message: "Please complete the required information." });
});

//login user
router.post("/login", async (req, res) => {
  const user = await User.where({ email: req.body.email }).fetch();
  const isMatch = await bcrypt.compare(
    req.body.password,
    user.attributes.password
  );
  if (!isMatch) return res.status(400).json({ err: "InValid Password." });
  const token = jwt.sign(
    { id: user.id, email: user.attributes.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  res.status(201).json({ user, token });
});

//get user
router.get("/current", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    let user = await User.where({ id: decoded.id }).fetch({
      withRelated: ["profile"],
    });

    // let userWithoutPassword = {
    //   id: user.id,
    //   userName: user.userName,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.email,
    //   password: null,
    //   profile: user.profile,
    // };

    // const current = { user.password, password: null };
    return res.status(200).json(user);
  }
  return res.status(403).json({ message: "Please Login" });
});

// get all users
router.get("/users", async (req, res) => {
  const users = await User.fetchAll({ withRelated: ["profile"] });

  // const allUsers = { ...users.attributes, password: null };
  // const usersWithProfile = users.filter((user) => {
  //   return user.profile.length > 0;
  // });

  return res.status(200).json(users);
});

module.exports = router;
