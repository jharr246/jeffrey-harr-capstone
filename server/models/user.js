const bookshelf = require("../../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  profile: function () {
    return this.hasMany("Profile");
  },
});

module.exports = User;
