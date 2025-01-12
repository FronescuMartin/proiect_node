import { GraphQLList } from 'graphql';
import db from '../../models/index.js';
import competitorType from '../types/competitorType.js';

const competitorsQueryResolver = async () => {
    const competitors = await db.Competitor.findAll();
    return competitors;
}

const competitorsQuery = {
    type: new GraphQLList(competitorType),
    resolve: competitorsQueryResolver,
};

export default competitorsQuery;