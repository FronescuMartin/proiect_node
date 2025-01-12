import graphql from 'graphql';
import competitorInputType from '../types/competitorInputType.js';
import competitorType from '../types/competitorType.js';
import db from '../../models/index.js';

const updateCompetitorMutationResolver = async (_, args, context) => {
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

    const competitor = await db.Competitor.findOne({
        where: {
            id: args.id,
        },
    });

    if (!competitor) {
        console.log("Competitor not found");
        return false;
    }

    const updatedCompetitor = await competitor.update({
        ...args.competitor
    });

    return updatedCompetitor;
}

const updateCompetitorMutation = {
    type: competitorType,
    args: {
        id: { type: graphql.GraphQLInt },
        competitor: { type: competitorInputType },
    },
    resolve: updateCompetitorMutationResolver,
};

export default updateCompetitorMutation;