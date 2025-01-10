import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import resultType from '../types/resultType.js';

const resultQueryResolver = async (_, { competitionId, competitorId, eventId }) => {
    const result = await db.Result.findOne({
        where: {
            competitionId, competitorId, eventId,
        }
    });

    if (!result) {
        return null;
    }

    return result;
}

const resultQuery = {
    type: resultType,
    args: {
        competitionId: { type: GraphQLInt },
        competitorId: { type: GraphQLInt },
        eventId: { type: GraphQLInt },
    },
    resolve: resultQueryResolver,
};

export default resultQuery;