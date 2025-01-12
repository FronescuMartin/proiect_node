import db from '../../models/index.js';
import { findOrCreateCompetition } from '../repositories/competitionRepository.js';

export const createResult = async (result) => {
    const foundEvent = await db.Event.findOne({
        where: {
            name: result.event.name,
            numberOfTimes: result.event.numberOfTimes,
        },
    });

    if (!foundEvent) {
        console.log("Event not found");
        return false;
    }

    // tries to find competition in the database, if it doesn't exist, it creates it
    const foundOrCreatedCompetition = await findOrCreateCompetition(result.competition);

    const foundCompetitor = await db.Competitor.findOne({
        where: {
            name: result.competitor.name,
            gender: result.competitor.gender,
            dateOfBirth: result.competitor.dateOfBirth,
            country: result.competitor.country,
        },
    });

    if (!foundCompetitor) {
        console.log("Competitor not found");
        return false;
    }

    const times = result.event.numberOfTimes;
    const single = Math.min(result.time1, result.time2, result.time3,
        result.time4 ? result.time4 : Infinity, result.time5 ? result.time5 : Infinity);
    const worst = Math.max(result.time1, result.time2, result.time3, result.time4 ? result.time4 : 0, result.time5? result.time5 : 0);
    // if there are 5 times, we calculate the sum of the middle 3 times
    const sum = times == 5 ? 
        (result.time1 + result.time2 + result.time3 + result.time4 + result.time5 - single - worst) : 
        (result.time1 + result.time2 + result.time3);

    const toBeCreatedResult = {
        competitorId: foundCompetitor.id,
        competitionId: foundOrCreatedCompetition.id,
        eventId: foundEvent.id,
        time1: result.time1,
        time2: result.time2,
        time3: result.time3,
        time4: times == 5 ? result.time4 : null,
        time5: times == 5 ? result.time5 : null,
        // according to some random on stackoverflow
        // this is the best way to round a number to 2 decimal places
        // because otherwise 1.005 gets rounded to 1!!!!!!
        // thank you js!
        single: Math.round((single + Number.EPSILON) * 100) / 100,
        average: Math.round((sum / 3 + Number.EPSILON) * 100) / 100,
    };

    console.log(toBeCreatedResult);

    try {
        const createdResult = await db.Result.create(toBeCreatedResult);
        return createdResult;
    } catch(err) {
        console.log(err);
        return false;
    }
}