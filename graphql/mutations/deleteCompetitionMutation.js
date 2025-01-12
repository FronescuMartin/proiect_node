import { GraphQLBoolean, GraphQLInt } from 'graphql';
import db from '../../models/index.js';

const deleteCompetitionResolver = async (_, args, context) => {
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

    await competition.destroy();
    return true;
};

const deleteCompetitionMutation = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteCompetitionResolver,
};

export default deleteCompetitionMutation;