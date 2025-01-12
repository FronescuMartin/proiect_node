import graphql from 'graphql';
import userInputType from '../types/userInputType.js';
import userType from '../types/userType.js';
import db from '../../models/index.js';
import bcrypt from 'bcrypt';

const updateCurrentUserMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        console.log("User is not logged in");
        return false;
    }
    
    const user = await db.User.findOne({
        where: {
            id: context.user_id,
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
        console.log(password);
    }
    console.log(args.user);
    const updatedUser = await user.update({
        name: args.user.name,
        password: password
    });

    return updatedUser;
}

const updateCurrentUserMutation = {
    type: userType,
    args: {
        user: {type: userInputType},
    },
    resolve: updateCurrentUserMutationResolver,
};

export default updateCurrentUserMutation;