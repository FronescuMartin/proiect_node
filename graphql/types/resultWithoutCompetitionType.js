import { GraphQLObjectType, GraphQLInt, GraphQLFloat } from 'graphql';
//import competitorType from './competitorType.js';
import competitionType from './competitionType.js';
import eventType from './eventType.js';
import competitorWithoutResultType from './competitorWithoutResultType.js';

const resultWithoutCompetitionType = new GraphQLObjectType({
    name: 'ResultWithoutCompetition',
    fields: {
/*         competitorId: { type: GraphQLInt },
        competitionId: { type: GraphQLInt },
        eventId: { type: GraphQLInt }, */
        time1: { type: GraphQLFloat },
        time2: { type: GraphQLFloat },
        time3: { type: GraphQLFloat },
        time4: { type: GraphQLFloat },
        time5: { type: GraphQLFloat },
        single: { type: GraphQLFloat },
        average: { type: GraphQLFloat },
        competitor: {
            type: competitorWithoutResultType,
            resolve: async (result) => {
                const competitor = await result.getCompetitor();
                return competitor;
            }
        },
/*         competition: {
            type: competitionType,
            resolve: async (result) => {
                const competition = await result.getCompetition();
                return competition;
            }
        }, */
        event: {
            type: eventType,
            resolve: async (result) => {
                const event = await result.getEvent();
                return event;
            }
        }
    }
});

export default resultWithoutCompetitionType;