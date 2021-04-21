// const faker = require("faker");

// const createUser = () => ({
//   userName: faker.internet.userName(),
//   firstName: faker.name.firstName(),
//   lastName: faker.name.lastName(),
//   email: faker.internet.email(),
//   password: faker.internet.password(),
// });

// exports.seed = async function (knex, Promise) {
//   const fakeUsers = [];

//   const numberOfUsers = 100;

//   for (let i = 0; i < numberOfUsers; i++) {
//     fakeUsers.push(createUser());
//   }

//   return await knex("users").insert(fakeUsers);
// };
