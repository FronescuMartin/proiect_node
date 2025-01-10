import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean} from 'graphql'

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        isOrganizer: { type: GraphQLBoolean }
    }
});

export default userType;