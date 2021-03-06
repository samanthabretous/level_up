module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('position', {
    type: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      },
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Position.hasMany(models.application);
        Position.hasMany(models.contact);
      },
    },
    timestamps: false,
  });
  return Position;
};
