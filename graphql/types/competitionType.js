import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

const competitionType = new GraphQLObjectType({
    name: 'Competition',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        date: { type: GraphQLString }   
    }
});

export default competitionType;