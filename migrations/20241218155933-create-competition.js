'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Competitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Results', {
      competitorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Competitors',
          },
          key: 'id',
        },
      },
      competitionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Competitions',
          },
          key: 'id',
        }
      },
      eventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Events',
          },
          key: 'id',
        }
      },
      time1: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      time2: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      time3: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      time4: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      time5: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      single: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      average: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Competitions');
    await queryInterface.dropTable('Results');
  }
};