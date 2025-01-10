import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

const eventInputType = new GraphQLObjectType({
    name: 'EventInput',
    fields: {
        name: { type: GraphQLString },
        numberOfTimes: { type: GraphQLInt }  
    }
});

export default competitionType;