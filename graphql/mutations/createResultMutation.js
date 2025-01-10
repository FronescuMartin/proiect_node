import resultType from '../types/resultType.js';
import resultInputType from '../types/resultInputType.js';
import db from '../../models/index.js';
import { createResult } from '../../core/services/createResultService.js';

const createResultMutationResolver = async (_, { result }, context) => {
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

    const createdResult = await createResult(result);

    return createdResult;
}

const createResultMutation = {
    type: resultType,
    args: {
        result: { type: resultInputType },
    },
    resolve: createResultMutationResolver,
};

export default createResultMutation;