import { GraphQLList } from 'graphql';
import db from '../../models/index.js';
import competitionType from '../types/competitionType.js';

const competitionsQueryResolver = async () => {
    const competitions = await db.Competition.findAll();
    return competitions;
}

const competitionsQuery = {
    type: new GraphQLList(competitionType),
    resolve: competitionsQueryResolver,
};

export default competitionsQuery;