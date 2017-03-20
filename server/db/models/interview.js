module.exports = (sequelize, DataTypes) => {
  const Interview = sequelize.define('interview', {
    phrase: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    content: {
      type: DataTypes.STRING,
    },
    when: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
