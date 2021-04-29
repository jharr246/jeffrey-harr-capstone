const router = require("express").Router();
const Profile = require("../models/profile");

const Meet = require("../models/meets");
const knex = require("knex");
const ProfileMeet = require("../models/profile_meet");
//create meet

router.post("/", async (req, res) => {
  Profile.where("id", req.body.profile_id)
    .fetch()
    .then((profile) => console.log("profile found"))
    .catch((profile) => {
      res.status(404).json({ error: "Please provide valid profile id" });
    });
  const meet = await new Meet({
    date: req.body.date,
    time: req.body.time,
    parkName: req.body.parkName,
    parkAddress: req.body.parkAddress,
    // profile_id: req.body.profile_id,
  }).save();

  const profileMeet = await new ProfileMeet({
    meet_id: meet.id,
    profile_id: req.body.profile_id,
  }).save();
  res.json(profileMeet);
});

// router.get("/:profileId", async (req, res) => {
//   const profileMeet = await ProfileMeet.where({
//     profile_id: req.params.profileId,
//   }).fetchAll();

//   const meets = [];

//   profileMeet.map(async (item) => {
//     const meet = await Meet.where({ id: item.meet_id });
//     meets.push(meet);
//   });

//   res.json({ profileMeet, meets });
// });

// router.get("/:profileId", async (req, res) => {
//   const profileMeet = await ProfileMeet.where({
//     profile_id: req.params.profileId,
//   }).fetchAll();

//   const ids = profileMeet.map((item) => {
//     return item.meet_id;
//   });

//   console.log(ids);

//   res.json(profileMeet);
// });

module.exports = router;
