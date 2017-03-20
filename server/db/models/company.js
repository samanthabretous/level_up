module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('company', {
    name: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Company.hasMany(models.application);
        Company.hasMany(models.contact);
      },
    },
    timestamps: false,
  });
  return Company;
};
