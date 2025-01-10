import {GraphQLInputObjectType, GraphQLInt, GraphQLString} from 'graphql'

const eventInputType = new GraphQLInputObjectType({
    name: 'EventInput',
    fields: {
        name: { type: GraphQLString },
        numberOfTimes: { type: GraphQLInt }  
    }
});

export default eventInputType;