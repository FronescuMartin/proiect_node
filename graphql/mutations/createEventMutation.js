import eventType from '../types/eventType.js';
import eventInputType from '../types/eventInputType.js';
import db from '../../models/index.js';

const createEventMutationResolver = async (_, { event }, context) => {
    const isAuthorized = !!context.user_id;
   
    if(!isAuthorized) {
        console.log("User is not logged in");
        return false;
    }

    const loggedInUser = await db.User.findOne({
        where: {
            id: context.user_id,
        },
    });

    if(!loggedInUser.isOrganizer) {
        console.log("User is not an organizer");
        return false;
    }
    
    const createdEvent = await db.Event.create({
        name: event.name,
        numberOfTimes: event.numberOfTimes,
    });

    return createdEvent;
}

const createEventMutation = {
    type: eventType,
    args: {
        event: {type: eventInputType},
    },
    resolve: createEventMutationResolver,
};

export default createEventMutation;