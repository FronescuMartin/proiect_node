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
        allowNull: false,
        unique: true
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
        onDelete: 'CASCADE',
      },
      competitionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Competitions',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      eventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Events',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    
    await queryInterface.addConstraint('Results', {
      fields: ['competitorId', 'competitionId', 'eventId'],
      type: 'unique',
      name: 'unique_competitor_competition_event'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Competitions');
    await queryInterface.dropTable('Results');
  }
};