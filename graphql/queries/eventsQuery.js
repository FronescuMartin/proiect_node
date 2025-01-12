import { GraphQLList } from 'graphql';
import db from '../../models/index.js';
import eventType from '../types/eventType.js';

const eventsQueryResolver = async () => {
    const events = await db.Event.findAll();
    return events;
}

const eventsQuery = {
    type: new GraphQLList(eventType),
    resolve: eventsQueryResolver,
};

export default eventsQuery;