const bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [5, 100],
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 100],
      },
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.application);
      },
    },
  });
  // change the password user has enter into an encrypted password before entering into database
  User.hook('beforeCreate', (user, fn) => {
    const newSalt = bcrypt.genSalt(12, (err, salt) => salt);
    user.password = bcrypt.hashSync(user.password, newSalt);
    return fn;
  });
  return User;
};
