import graphql from 'graphql';
import userInputType from '../types/userInputType.js';
import userType from '../types/userType.js';
import db from '../../models/index.js';
import bcrypt from 'bcrypt';

const updateUserMutationResolver = async (_, args) => {
    const id = args.id;

    const user = await db.User.findOne({
        where: {
            id,
        }
    });

    if(!user) {
        console.log("Invalid user");
        return false;
    }

/*     const updatedUser = await user.update({
        ...args.user
    }); */
    const password = await bcrypt.hash(user.password, 5);
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