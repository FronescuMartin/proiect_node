'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mockUsers = new Array(200).fill().map(() => {
      return {
        name: faker.internet.username(),
        password: faker.internet.password(),
        isOrganizer: false,
        createdAt: Date(),
        updatedAt: Date(),
      }
    });

    const mockCompetitors = new Array(200).fill().map((_, index) => {
      const randomChance = Math.random();

      return {
        userId: index + 1,
        name: mockUsers[index].name,
        gender: randomChance < 0.95 ? faker.person.sex() : "other",
        dateOfBirth: faker.date.between({ from: '1940-01-01', to: '2020-01-01' }).toISOString().split('T')[0],
        country: faker.location.country(),
        createdAt: Date(),
        updatedAt: Date(),
      }
    });

    await queryInterface.bulkInsert('Users', mockUsers, {});
    await queryInterface.bulkInsert('Competitors', mockCompetitors, {});
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
