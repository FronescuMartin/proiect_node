import graphql from 'graphql';
import userInputType from '../types/userInputType.js';
import userType from '../types/userType.js';
import db from '../../models/index.js';
import bcrypt from 'bcrypt';

const updateUserMutationResolver = async (_, args, context) => {
    const id = args.id;

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

    // checks if the logged in user is an organizer
    if (!loggedInUser.isOrganizer) {
        console.log("User is not an organizer");
        return false;
    }

    const user = await db.User.findOne({
        where: {
            id,
        },
    });

    if(!user) {
        console.log("Invalid user");
        return false;
    }

/*     const updatedUser = await user.update({
        ...args.user
    }); */
    let password;
    if(args.user.password){
        password = await bcrypt.hash(args.user.password, 5);
    } else {
        password = user.password;
    }
    console.log(args.user);
    const updatedUser = await user.update({
        name: args.user.name,
        password: password
    });

    return updatedUser;
}

const updateUserMutation = {
    type: userType,
    args: {
        id: {type: graphql.GraphQLInt},
        user: {type: userInputType},
    },
    resolve: updateUserMutationResolver,
};

export default updateUserMutation;