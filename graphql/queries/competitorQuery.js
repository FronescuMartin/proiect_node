import {GraphQLInt} from 'graphql';
import db from '../../models/index.js';
import competitorType from '../types/competitorType.js';

const competitorQueryResolver = async (_, { id }) => {
    const competitor = await db.Competitor.findOne({
        where: {
            id,
        }
    });

    if(!competitor) {
        return null;
    }

    return competitor;
}

const competitorQuery = {
    type: competitorType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: competitorQueryResolver,
};

export default competitorQuery;