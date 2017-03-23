module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('application', {
    rank: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rejected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    postURL: {
      type: DataTypes.STRING,
    },
    dateApplied: {
      type: DataTypes.DATE,
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: 'NY',
    },
    coverLetter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Application.belongsTo(models.company);
        Application.belongsTo(models.position);
        Application.belongsTo(models.source);
        Application.belongsTo(models.user);
        Application.hasMany(models.contact);
        Application.hasMany(models.interview);
      },
    },
  });
  return Application;
};
