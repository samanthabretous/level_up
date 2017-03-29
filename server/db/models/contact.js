module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contact', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Contact.belongsToMany(models.interview, { through: 'interviewer' });
        Contact.belongsToMany(models.application, { through: 'reference' });
        Contact.belongsTo(models.position);
        Contact.belongsTo(models.company);
      },
    },
  });
  return Contact;
};
