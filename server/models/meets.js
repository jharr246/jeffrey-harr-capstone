const bookshelf = require("../../bookshelf");

const Meet = bookshelf.model("Meet", {
  tableName: "meets",
  profile: function () {
    return this.belongsToMany("Profile");
  },
  profileMeet: function () {
    return this.belongsToMany("ProfileMeet");
  },
});

module.exports = Meet;
