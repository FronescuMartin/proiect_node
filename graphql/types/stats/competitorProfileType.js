import { GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString, GraphQLFloat } from 'graphql';
import resultWithoutCompetitionType from '../resultWithoutCompetitionType.js';

const eventBestType = new GraphQLObjectType({
    name: 'EventBest',
    fields: {
        eventName: { type: GraphQLString },
        bestSingle: { type: GraphQLFloat },
        bestAverage: { type: GraphQLFloat },
        averageAverage: { type: GraphQLFloat },
    }
});

const competitorProfileType = new GraphQLObjectType({
    name: 'CompetitorProfile',
    fields: {
        eventBest: { type: new GraphQLList(eventBestType) }
    }
});

export default competitorProfileType;