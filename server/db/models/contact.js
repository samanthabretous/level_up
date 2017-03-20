'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contact', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Contact.belongsToMany(models.interview, { through: 'interviewer' });
        Contact.belongsTo(models.company)
      },
    },
  });
  return Contact;
};
