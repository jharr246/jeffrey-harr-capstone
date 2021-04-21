const faker = require("faker");
const dogNames = require("dog-names");
const randomAnimal = require("random-animal.js");
const axios = require("axios");

// const createAvatar = async () => {
//   let image = await axios.get(
//     "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1"
//   );
//   image = image.data[0].url;
//   return image;
// };

const createProfile = () => ({
  dogAvatar: randomAnimal
    .randomDog()
    .then((dog) => {
      console.log(dog);
    })
    .catch((error) => console.log(error.message)),

  dogName: dogNames.allRandom(),
  breed: faker.animal.dog(),
  dogBio: faker.lorem.sentence(),
  city: faker.address.city(),
  state: faker.address.state(),
});

exports.seed = async function (knex, Promise) {
  const fakeProfiles = [];
  const numberOfProfiles = 100;
  for (let i = 0; i < numberOfProfiles; i++) {
    fakeProfiles.push(createProfile());
  }
  await knex("profiles").insert(fakeProfiles);
  // createAvatar();
};
