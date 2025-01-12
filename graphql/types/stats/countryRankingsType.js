import { GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import resultWithoutCompetitionType from '../resultWithoutCompetitionType.js';

const eventRankingsType = new GraphQLObjectType({
    name: 'EventRankings',
    fields: {
        eventName: { type: GraphQLString },
        results: { type: new GraphQLList(resultWithoutCompetitionType) }
    }
});

const countryRankingsType = new GraphQLObjectType({
    name: 'CountryRankings',
    fields: {
        eventRankings: { type: new GraphQLList(eventRankingsType) }
    }
});

export default countryRankingsType;