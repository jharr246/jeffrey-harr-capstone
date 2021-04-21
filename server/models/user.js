const bookshelf = require("../../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  profiles: function () {
    return this.hasOne("profile");
  },
});

module.exports = User;
