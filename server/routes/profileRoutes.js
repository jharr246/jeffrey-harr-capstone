const router = require("express").Router();
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const ProfileMeet = require("../models/profile_meet");
const Meet = require("../models/meets");
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

    const profileMeets = await ProfileMeet.where({
      profile_id: profile.id,
    }).fetchAll();

    const meetIds = profileMeets.map((item) => {
      return item._previousAttributes.meet_id;
    });
    // console.log(meetIds);
    // const meets = profileMeets
    //   .join("meets", "profileMeets.meet_id", "=", "meets.id")
    //   .fetchAll();

    // const meets = await Meet.where({ id: profileMeets.meet_id }).fetchAll();

    const meets = await Meet.where("id", "IN", meetIds).fetchAll();

    return res.status(200).json({ current, meets });
  }
  return res.status(403).json({ message: "Please Login" });
});

//get all profiles

router.get("/all", async (req, res) => {
  const profiles = await Profile.fetchAll({ withRelated: ["user"] });
  return res.status(200).json(profiles);
});

module.exports = router;

//get profile details and meets on other users profile
router.get("/:id", async (req, res) => {
  const profile = await Profile.where({ id: req.params.id }).fetch({
    withRelated: ["user"],
  });

  const current = { ...profile.attributes, password: null };

  const profileMeets = await ProfileMeet.where({
    profile_id: profile.id,
  }).fetchAll();

  const meetIds = profileMeets.map((item) => {
    return item._previousAttributes.meet_id;
  });

  const meets = await Meet.where("id", "IN", meetIds).fetchAll();

  return res.status(200).json({ current, meets });
});
