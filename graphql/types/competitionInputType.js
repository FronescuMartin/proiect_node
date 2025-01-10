import {GraphQLInputObjectType, GraphQLList, GraphQLString} from 'graphql'

const competitionInputType = new GraphQLInputObjectType({
    name: 'CompetitionInput',
    fields: {
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        date: { type: GraphQLString }  
    }
});

export default competitorInputType;