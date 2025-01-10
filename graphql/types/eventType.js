import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

const eventType = new GraphQLObjectType({
    name: 'Event',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        numberOfTimes: { type: GraphQLInt }  
    }
});

export default eventType;