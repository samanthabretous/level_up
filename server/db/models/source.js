module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define('source', {
    type: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        Source.hasMany(models.application);
      },
    },
    timestamps: false,
  });
  return Source;
};
