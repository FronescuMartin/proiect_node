'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let events = [
        {
            name: '2x2',
            numberOfTimes: 5,
        },
        {
            name: '3x3',
            numberOfTimes: 5,
        },
        {
            name: '4x4',
            numberOfTimes: 5,
        },
        {
            name: '5x5',
            numberOfTimes: 5,
        },
        {
            name: '6x6',
            numberOfTimes: 3,
        },
        {
            name: '7x7',
            numberOfTimes: 3,
        },
        {
            name: 'Megaminx',
            numberOfTimes: 5,
        },
    ];

    events = events.map(event => {
        return {
            ...event,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });

    await queryInterface.bulkInsert('Events', events, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
