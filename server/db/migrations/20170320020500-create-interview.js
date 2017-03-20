module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('interviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phrase: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      when: {
        type: Sequelize.DATE,
      },
      codeChallenge: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      codeChallengeNotes: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.BOOLEAN,
        validate: {
          isIn: [['phone', 'video', 'on-site']],
        },
      },
      thankYou: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      feedBack: {
        type: Sequelize.TEXT,
      },
      reminder: {
        type: Sequelize.DATE,
      },
      reminderNotes: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('interviews');
  },
};
