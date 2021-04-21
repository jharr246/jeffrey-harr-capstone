const bookshelf = require("../../bookshelf");

const Profile = bookshelf.model("Profile", {
  tableName: "profiles",
  user: function () {
    return this.belongsTo("user");
  },
});

module.exports = Profile;
