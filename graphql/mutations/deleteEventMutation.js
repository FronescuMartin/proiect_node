import { GraphQLBoolean, GraphQLInt } from 'graphql';
import db from '../../models/index.js';

const deleteEventResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        console.log("User is not logged in");
        return false;
    }

    const loggedInUser = await db.User.findOne({
        where: {
            id: context.user_id,
        },
    });

    if (!loggedInUser.isOrganizer) {
        console.log("User is not an organizer");
        return false;
    }

    const event = await db.Event.findOne({
        where: {
            id: args.id,
        },
    });

    if (!event) {
        console.log("Event not found");
        return false;
    }

    await event.destroy();
    return true;
};

const deleteEventMutation = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteEventResolver,
};

export default deleteEventMutation;