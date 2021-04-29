const bookshelf = require("../../bookshelf");

const Profile = bookshelf.model("Profile", {
  tableName: "profiles",
  user: function () {
    return this.belongsTo("User");
  },
  meets: function () {
    return this.belongsToMany("Meet");
  },
});

module.exports = Profile;
