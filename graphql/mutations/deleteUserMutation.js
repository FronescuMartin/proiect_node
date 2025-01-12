import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../models/index.js';

const deleteUserResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        console.log("User is not logged in");
        return false;
    }

    const user = await db.User.findOne({
        where: {
            id: args.id,
        }
    })

    if (!user) {
        console.log("User not found");
        return false;
    }

    await user.destroy();
    return true;
}

const deleteUserMutation = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLInt},
    },
    resolve: deleteUserResolver,
};

export default deleteUserMutation;