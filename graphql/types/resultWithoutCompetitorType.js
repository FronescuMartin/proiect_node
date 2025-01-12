import { GraphQLObjectType, GraphQLInt, GraphQLFloat } from 'graphql';
import competitorType from './competitorType.js';
import competitionType from './competitionType.js';
import eventType from './eventType.js';
import competitionWithoutResultType from './competitionWithoutResultType.js';

const resultWithoutCompetitorType = new GraphQLObjectType({
    name: 'ResultWithoutCompetitor',
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
/*         competitor: {
            type: competitorType,
            resolve: async (result) => {
                const competitor = await result.getCompetitor();
                return competitor;
            }
        }, */
        competition: {
            type: competitionWithoutResultType,
            resolve: async (result) => {
                const competition = await result.getCompetition();
                return competition;
            }
        },
        event: {
            type: eventType,
            resolve: async (result) => {
                const event = await result.getEvent();
                return event;
            }
        }
    }
});

export default resultWithoutCompetitorType;