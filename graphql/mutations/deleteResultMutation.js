import { GraphQLBoolean, GraphQLInt } from 'graphql';
import db from '../../models/index.js';

const deleteResultResolver = async (_, args, context) => {
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

    console.log(args.competitorId, args.competitionId, args.eventId);

    const result = await db.Result.findOne({
        where: {
            competitorId: args.competitorId,
            competitionId: args.competitionId,
            eventId: args.eventId,
        },
    });

    if (!result) {
        console.log("Result not found");
        return false;
    }

    // this doesn't work any other way
    await db.Result.destroy({
        where: {
            competitorId: args.competitorId,
            competitionId: args.competitionId,
            eventId: args.eventId,
        },
    });

    return true;
};

const deleteResultMutation = {
    type: GraphQLBoolean,
    args: {
        competitorId: { type: GraphQLInt },
        competitionId: { type: GraphQLInt },
        eventId: { type: GraphQLInt },
    },
    resolve: deleteResultResolver,
};

export default deleteResultMutation;