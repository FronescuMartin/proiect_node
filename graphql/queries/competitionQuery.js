import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import competitionType from '../types/competitionType.js';

const competitionQueryResolver = async (_, { id }) => {
    const competition = await db.Competition.findOne({
        where: {
            id,
        }
    });

    if (!competition) {
        return null;
    }

    return competition;
}

const competitionQuery = {
    type: competitionType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: competitionQueryResolver,
};

export default competitionQuery;