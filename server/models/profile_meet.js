const bookshelf = require("../../bookshelf");

const ProfileMeet = bookshelf.model("ProfileMeet", {
  tableName: "profiles_meets",
  meets: function () {
    return this.hasMany("Meet");
  },
});

module.exports = ProfileMeet;
