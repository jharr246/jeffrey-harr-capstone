// const userData = require("./seed_data/users");
// const profileData = require("./seed_data/profiles");
const meetData = require("./seed_data/meets");

const faker = require("faker");
const dogNames = require("dog-names");
const randomAnimal = require("random-animal.js");
const { default: axios } = require("axios");
const { fake } = require("faker");
const bcrypt = require("bcrypt");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

const createUser = () => ({
  userName: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: hashPassword(faker.internet.password()),
});

const fakeUser = createUser();

let fakeUsers = [];

const create100users = () => {
  const numberOfUsers = 100;

  for (let i = 0; i < numberOfUsers; i++) {
    fakeUsers.push(createUser());
  }
};

create100users();

// let profile = {};
// let fakeProfiles = [];
// const createProfile = () => {
//   for (let i = 0; i < 100; i++) {
//     return axios
//       .get(
//         "https://api.thedogapi.com/v1/images/search?limit=1&page=100&order=DESC"
//       )
//       .then((res) => {
//         profile = {
//           // ...profile,
//           dogAvatar: res.data[0].url,
//           dogName: dogNames.allRandom(),
//           breed: faker.animal.dog(),
//           dogBio: faker.lorem.sentence(),
//           city: faker.address.city(),
//           state: faker.address.state(),
//         };
//         return fakeProfiles.push(profile);
//       })
//       .catch((e) => console.log(e.message));
//   }
//   return fakeProfiles;
// };

let profile = {};
let fakeProfiles = [];
const createProfile = () => {
  return axios
    .get(
      "https://api.thedogapi.com/v1/images/search?limit=1&page=100&order=DESC"
    )
    .then((res) => {
      for (let i = 0; i < 100; i++) {
        profile = {
          // ...profile,
          dogAvatar: res.data[0].url,
          dogName: dogNames.allRandom(),
          breed: faker.animal.dog(),
          dogBio: faker.lorem.sentence(),
          city: faker.address.city(),
          state: faker.address.state(),
        };
        fakeProfiles.push(profile);
      }

      return fakeProfiles;
    })
    .catch((e) => console.log(e.message));
};

exports.seed = function (knex) {
  return (
    knex("users")
      .del()
      .then(() => {
        return knex("users").insert(fakeUsers);
      })
      // .catch((err) => {
      //   console.log(err);
      // })

      .then(() => {
        return knex("profiles").del();
      })
      .then(() => {
        return createProfile();
      })
      .then((profiles) => {
        return knex("users")
          .pluck("id")
          .then((usersIds) => {
            let updatedProfiles = profiles.map((profile) => {
              profile.user_id =
                usersIds[Math.floor(Math.random() * usersIds.length)];
              return profile;
            });
            return updatedProfiles;
          });
      })
      .then((res) => {
        return knex("profiles").insert(res);
      })
      .then(() => {
        return (
          knex("meets")
            .del()
            // .then(() => {
            //   return knex("profiles")
            //     .pluck("id")
            //     .then((profileIds) => {
            //       return profileIds;
            //     });
            // })
            // .then((profileIds) => {
            //   const meetDatawithprofileIds = meetData.map((meet) => {
            //     meet.profile_id =
            //       profileIds[Math.floor(Math.random() * profileIds.length)];
            //     return meet;
            //   });
            //   return knex("meets").insert(meetDatawithprofileIds);
            // });
            .then(() => {
              return knex("meets").insert(meetData);
            })
        );
      })
  );

  // .then(() => {
  //   return knex("meets").del();
  // })
  // .then(() => {
  //   return knex("meets").insert(meetsData);
  // });
};
