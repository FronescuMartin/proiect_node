import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from 'graphql'
//import resultWithoutCompetitionType from './resultWithoutCompetitionType.js';

const competitionWithoutResultType = new GraphQLObjectType({
    name: 'CompetitionWithoutResult',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        date: { type: GraphQLString },
/*         results: {
            type: new GraphQLList(resultWithoutCompetitionType),
            resolve: async (competitor) => {
                const results = await competitor.getResults();
                return results;
            }
        } */
    }
});

export default competitionWithoutResultType;