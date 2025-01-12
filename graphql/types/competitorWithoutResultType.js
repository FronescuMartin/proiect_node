import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from 'graphql'
import userType from './userType.js';
//import competitionType from './competitionType.js';
import competitionWithoutResultType from './competitionWithoutResultType.js';
//import resultWithoutCompetitorType from './resultWithoutCompetitorType.js';

const competitorWithoutResultType = new GraphQLObjectType({
    name: 'CompetitorWithoutResult',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        country: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        user: { 
            type: userType,
            resolve: async (competitor) => {
                const user = await competitor.getUser();

                return user;
            }
        },
/*         competitions: {
            type: new GraphQLList(competitionWithoutResultType),
            resolve: async (competitor) => {
                const competitions = await competitor.getCompetitions();
                return competitions;
            }
        }, */
/*         results: {
            type: new GraphQLList(resultWithoutCompetitorType),
            resolve: async (competitor) => {
                const results = await competitor.getResults();
                return results;
            }
        } */
    }
});

export default competitorWithoutResultType;