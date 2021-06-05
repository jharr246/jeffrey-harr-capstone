const router = require("express").Router();
const axios = require("axios");
router.post("/", (req, res) => {
  console.log(req.body);
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=dogpark+in+${req.body.city}+${req.body.st}&key=${process.env.GOOGLE_PLACES}`
    )
    .then((response) => {
      let park = response.data.results;
      res.send(park);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
