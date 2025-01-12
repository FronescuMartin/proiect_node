import graphql from 'graphql';
import competitorInputType from '../types/competitorInputType.js';
import competitorType from '../types/competitorType.js';
import db from '../../models/index.js';

const updateCurrentCompetitorMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        console.log("User is not logged in");
        return false;
    }

    const competitor = await db.Competitor.findOne({
        where: {
            userId: context.user_id,
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

const updateCurrentCompetitorMutation = {
    type: competitorType,
    args: {
        competitor: { type: competitorInputType },
    },
    resolve: updateCurrentCompetitorMutationResolver,
};

export default updateCurrentCompetitorMutation;