import db from '../../models/index.js';

export const createCompetitor = async (competitor, context) => {
    const createdCompetitor = await db.Competitor.create({
        name: competitor.name,
        gender: competitor.gender,
        userId: context.user_id,
        dateOfBirth: competitor.dateOfBirth,
        country: competitor.country,
     });
 
 

     return createdCompetitor;
}