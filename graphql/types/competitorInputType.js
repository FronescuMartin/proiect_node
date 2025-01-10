import {GraphQLInputObjectType, GraphQLList, GraphQLString} from 'graphql'

const competitorInputType = new GraphQLInputObjectType({
    name: 'CompetitorInput',
    fields: {
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        country: { type: GraphQLString },
        
        //tags: { type: new GraphQLList(GraphQLString) }
    }
});

export default competitorInputType;