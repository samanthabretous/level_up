module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rank: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rejected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: { model: 'companies', key: 'id' }
      },
      positionId: {
        type: Sequelize.INTEGER,
        references: { model: 'positions', key: 'id' }
      },
      sourceId: {
        type: Sequelize.INTEGER,
        references: { model: 'sources', key: 'id' }
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('applications');
  },
};
