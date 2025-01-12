import { GraphQLObjectType } from 'graphql';
import userQuery from '../queries/userQuery.js';
import usersQuery from '../queries/usersQuery.js';
import competitorQuery from '../queries/competitorQuery.js';
import eventQuery from '../queries/EventQuery.js';
import competitionQuery from '../queries/competitionQuery.js';
import resultQuery from '../queries/resultQuery.js';
import competitorsQuery from '../queries/competitorsQuery.js';
import eventsQuery from '../queries/eventsQuery.js';
import competitionsQuery from '../queries/competitionsQuery.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,
        competitor: competitorQuery,
        competitors: competitorsQuery,
        event: eventQuery,
        events: eventsQuery,
        competition: competitionQuery,
        competitions: competitionsQuery,
        result: resultQuery,
    },
});


export default queryType;