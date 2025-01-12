import { GraphQLInputObjectType, GraphQLInt, GraphQLFloat } from 'graphql';
import competitorInputType from './competitorInputType.js';
import competitionInputType from './competitionInputType.js';
import eventInputType from './eventInputType.js';

const resultInputType = new GraphQLInputObjectType({
    name: 'ResultInput',
    fields: {
        competitor: { type: competitorInputType },
        competition: { type: competitionInputType },
        event: { type: eventInputType },
        time1: { type: GraphQLFloat },
        time2: { type: GraphQLFloat },
        time3: { type: GraphQLFloat },
        time4: { type: GraphQLFloat },
        time5: { type: GraphQLFloat },
        // single and average are calculated from times
    }
});

export default resultInputType;