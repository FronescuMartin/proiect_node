import graphql from 'graphql';
import createUserMutation from '../mutations/createUserMutation.js';
import updateUserMutation from '../mutations/updateUserMutation.js';
import deleteUserMutation from '../mutations/deleteUserMutation.js';
import loginMutation from '../mutations/loginMutation.js';
import createCompetitorMutation from '../mutations/createCompetitorMutation.js';
import createEventMutation from '../mutations/createEventMutation.js';

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        deleteUser: deleteUserMutation,
        login: loginMutation,
        createCompetitor: createCompetitorMutation,
        createEvent: createEventMutation,
    }
});


export default queryType;