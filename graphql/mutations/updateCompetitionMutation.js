import graphql from 'graphql';
import competitionInputType from '../types/competitionInputType.js';
import competitionType from '../types/competitionType.js';
import db from '../../models/index.js';

const updateCompetitionMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        console.log("User is not logged in");
        return false;
    }

    const loggedInUser = await db.User.findOne({
        where: {
            id: context.user_id,
        },
    });

    if (!loggedInUser.isOrganizer) {
        console.log("User is not an organizer");
        return false;
    }

    const competition = await db.Competition.findOne({
        where: {
            id: args.id,
        },
    });

    if (!competition) {
        console.log("Competition not found");
        return false;
    }

    const updatedCompetition = await competition.update({
        ...args.competition
    });

    return updatedCompetition;
}

const updateCompetitionMutation = {
    type: competitionType,
    args: {
        id: { type: graphql.GraphQLInt },
        competition: { type: competitionInputType },
    },
    resolve: updateCompetitionMutationResolver,
};

export default updateCompetitionMutation;