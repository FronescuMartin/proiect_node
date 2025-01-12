'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const competitions = new Array(20).fill().map(() => {
      const country = faker.location.country();
      const randomChance = Math.random();
      const year = Math.floor(Math.random() * 43) + 1982; // between 1982 and 2025
      const date = faker.date.between({ from: `${year}-01-01`, to: `${year}-12-31` }).toISOString().split('T')[0];

      const connector = randomChance < 0.5 ? " Open " : " Cube Days ";

      return {
        name: country + connector + year,
        city: faker.location.city(),
        country: country,
        date,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    })

    await queryInterface.bulkInsert('Competitions', competitions, {});
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
