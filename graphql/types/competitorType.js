import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from 'graphql'
import userType from './userType.js';
import competitionType from './competitionType.js';

const competitorType = new GraphQLObjectType({
    name: 'Competitor',
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
        competitions: {
            type: new GraphQLList(competitionType),
            resolve: async (competitor) => {
                const competitions = await competitor.getCompetitions();
                return competitions;
            }
        }
    }
});

export default competitorType;