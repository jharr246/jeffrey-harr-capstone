const router = require("express").Router();
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
//create profile

router.post("/", async (req, res) => {
  User.where("id", req.body.user_id)
    .fetch()
    .then((user) => console.log("user found"))
    .catch((user) => {
      res.status(404).json({ error: "Please provide valid user id" });
    });
  new Profile({
    dogName: req.body.dogName,
    dogBio: req.body.dogBio,
    dogAvatar: req.body.dogAvatar,
    breed: req.body.breed,
    city: req.body.city,
    state: req.body.state,
    user_id: req.body.user_id,
  })
    .save()
    .then((newProfile) => {
      res.status(201).send("Profile Created!");
    });
});

// router.delete("/delete", async (req, res) => {
//   Profile.where("id", req.body.id)
//     .destroy()
//     .then((deletedProfile) => {
//       res.status(200).json({ deletedProfile });
//     });
// });

//get profile
router.get("/current", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const profile = await Profile.where({ id: decoded.id }).fetch({
      withRelated: ["user"],
    });

    const current = { ...profile.attributes, password: null };
    return res.status(200).json(current);
  }
  return res.status(403).json({ message: "Please Login" });
});

module.exports = router;
