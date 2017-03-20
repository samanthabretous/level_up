module.exports = (sequelize, DataTypes) => {
  const Interview = sequelize.define('interview', {
    phrase: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    when: {
      type: DataTypes.DATE,
    },
    codeChallenge: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    codeChallengeNotes: {
      type: DataTypes.TEXT,
    },
    thankYou: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: [['phone', 'video', 'on-site']],
      },
    },
    feedBack: {
      type: DataTypes.TEXT,
    },
    reminder: {
      type: DataTypes.DATE,
    },
    reminderNotes: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        Interview.belongsToMany(models.contact, { through: 'interviewer' });
        Interview.belongsTo(models.application);
      },
    },
  });
  return Interview;
};
