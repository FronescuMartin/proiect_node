//useless??
import db from '../../models/index.js';
export const findOrCreateCompetition = async (competition) => {
    const foundCompetition = await db.Competition.findOne({
        where: {
            name: competition.name,
        }
    });

    if (!foundCompetition) {
        const createdCompetition = await db.Competition.create({
            name: competition.name,
            city: competition.city,
            country: competition.country,
            date: competition.date,
        });

        return createdCompetition;
    }

    return foundCompetition;
};