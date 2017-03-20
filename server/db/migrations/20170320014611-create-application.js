module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      postURL: {
        type: Sequelize.STRING,
      },
      dateApplied: {
        type: Sequelize.DATE,
      },
      location: {
        type: Sequelize.STRING,
        defaultValue: 'NY',
      },
      coverLetter: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    return queryInterface.dropTable('applications');
  },
};
