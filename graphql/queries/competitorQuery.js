import {GraphQLInt} from 'graphql';
import db from '../../models/index.js';
import competitorType from '../types/competitorType.js';

const copmetitorQueryResolver = async (_, { id }) => {
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
    resolve: copmetitorQueryResolver,
};

export default competitorQuery;