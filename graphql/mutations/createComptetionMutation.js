import competitionInputType from '../types/competitionInputType.js';
import db from '../../models/index.js';
import competitionType from '../types/competitionType.js';

const createCompetitionMutationResolver = async (_, { competition }, context) => {
    const isAuthorized = !!context.user_id;
   
    if(!isAuthorized) {
        console.log("User is not logged in");
        return false;
    }

    const loggedInUser = await db.User.findOne({
        where: {
            id: context.user_id,
        },
    });

    if(!loggedInUser.isOrganizer) {
        console.log("User is not an organizer");
        return false;
    }
    
    const createdCompetition = await db.Competition.create({
        name: competition.name,
        city: competition.city,
        country: competition.country,
        date: competition.date,
    });

    return createdCompetition;
}

const createCompetitionMutation = {
    type: competitionType,
    args: {
        competition: {type: competitionInputType},
    },
    resolve: createCompetitionMutationResolver,
};

export default createCompetitionMutation;