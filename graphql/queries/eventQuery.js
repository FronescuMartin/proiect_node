import {GraphQLInt} from 'graphql';
import db from '../../models/index.js';
import eventType from '../types/eventType.js';

const eventQueryResolver = async (_, { id }) => {
    const event = await db.Event.findOne({
        where: {
            id,
        }
    });

    if(!event) {
        return null;
    }

    return event;
}

const eventQuery = {
    type: eventType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: eventQueryResolver,
};

export default eventQuery;