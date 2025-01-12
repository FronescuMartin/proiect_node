import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from 'graphql'
import resultWithoutCompetitionType from './resultWithoutCompetitionType.js';
import competitorWithoutResultType from './competitorWithoutResultType.js';

const competitionType = new GraphQLObjectType({
    name: 'Competition',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        date: { type: GraphQLString },
        results: {
            type: new GraphQLList(resultWithoutCompetitionType),
            resolve: async (competitor) => {
                const results = await competitor.getResults();
                return results;
            }
        },
        competitors: {
            type: new GraphQLList(competitorWithoutResultType),
            resolve: async (competition) => {
                const competitors = await competition.getCompetitors();
                const uniqueCompetitors = Array.from(new Set(competitors.map(c => c.id)))
                    .map(id => competitors.find(c => c.id === id));
                return uniqueCompetitors;
            }
        }
    }
});

export default competitionType;