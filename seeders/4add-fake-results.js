'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    function generateRandomTimes(minTime, maxTime, numberOfTimes) {
      const times = [];
      for (let i = 0; i < numberOfTimes; i++) {
        const time = (Math.random() * (maxTime - minTime) + minTime).toFixed(2);
        times.push(parseFloat(time));
      }
      return times;
    }

    const uniqueCombinations = new Set();

    const results = new Array(300).fill().map(() => {
      let competitorId, competitionId, eventId, combinationKey;

      // generate a unique combo of competitorId, competitionId, eventId
      do {
        competitorId = Math.floor(Math.random() * 200) + 1;
        competitionId = Math.floor(Math.random() * 20) + 1;
        eventId = Math.floor(Math.random() * 7) + 1;
        combinationKey = `${competitorId}-${competitionId}-${eventId}`;
      } while (uniqueCombinations.has(combinationKey));
      
      uniqueCombinations.add(combinationKey);

      let minTime, maxTime, numberOfTimes = 5;

      // events id 5 and 6 should have 3 times
      switch(eventId) {
        case 1: // 2x2
          minTime = 0.5;
          maxTime = 8;
          break;
        case 2: // 3x3
          minTime = 4;
          maxTime = 30;
          break;
        case 3: // 4x4
          minTime = 18;
          maxTime = 100;
          break;
        case 4: // 5x5
          minTime = 35;
          maxTime = 150;
          break;
        case 5: // 6x6
          minTime = 59;
          maxTime = 240;
          numberOfTimes = 3;
          break;
        case 6: // 7x7
          minTime = 90;
          maxTime = 300;
          numberOfTimes = 3;
          break;
        case 7: // Megaminx
          minTime = 25;
          maxTime = 150;
          break;
        default:
          break;
      }
  
      const times = generateRandomTimes(minTime, maxTime, numberOfTimes);

      const single = Math.min(times[0], times[1], times[2],
        times[3] ? times[3] : Infinity, times[4] ? times[4] : Infinity);
      const worst = Math.max(times[0], times[1], times[2], times[3] ? times[3] : 0, times[4] ? times[4] : 0);
      // if there are 5 times, we calculate the sum of the middle 3 times
      const sum = times == 5 ? 
          (times[0] + times[1] + times[2] + times[3] + times[4] - single - worst) : 
          (times[0] + times[1] + times[2]);

      return {
        eventId,
        competitorId,
        competitionId,
        time1: times[0],
        time2: times[1],
        time3: times[2],
        time4: numberOfTimes === 5 ? times[3] : null,
        time5: numberOfTimes === 5 ? times[4] : null,
        single: Math.round((single + Number.EPSILON) * 100) / 100,
        average: Math.round((sum / 3 + Number.EPSILON) * 100) / 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    try {
      await queryInterface.bulkInsert('Results', results, {});
    } catch (err) {
      console.error(err);
    }
    
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
