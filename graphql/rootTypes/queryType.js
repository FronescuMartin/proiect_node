import { GraphQLObjectType } from 'graphql';
import userQuery from '../queries/userQuery.js';
import usersQuery from '../queries/usersQuery.js';
import competitorQuery from '../queries/competitorQuery.js';
import eventQuery from '../queries/EventQuery.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,
        competitor: competitorQuery,
        event: eventQuery
    },
});


export default queryType;