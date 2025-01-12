import graphql from 'graphql';
import createUserMutation from '../mutations/createUserMutation.js';
import updateUserMutation from '../mutations/updateUserMutation.js';
import deleteUserMutation from '../mutations/deleteUserMutation.js';
import loginMutation from '../mutations/loginMutation.js';
import createCompetitorMutation from '../mutations/createCompetitorMutation.js';
import createEventMutation from '../mutations/createEventMutation.js';
import createCompetitionMutation from '../mutations/createComptetionMutation.js';
import { createResult } from '../../core/services/createResultService.js';
import createResultMutation from '../mutations/createResultMutation.js';
import updateCurrentUserMutation from '../mutations/updateCurrentUserMutation.js';
import deleteResultMutation from '../mutations/deleteResultMutation.js';
import deleteCompetitionMutation from '../mutations/deleteCompetitionMutation.js';
import deleteEventMutation from '../mutations/deleteEventMutation.js';
import updateCompetitorMutation from '../mutations/updateCompetitorMutation.js';
import updateCurrentCompetitorMutation from '../mutations/updateCurrentCompetitorMutation.js';
import updateCompetitionMutation from '../mutations/updateCompetitionMutation.js';

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        updateCurrentUser: updateCurrentUserMutation,
        deleteUser: deleteUserMutation,

        login: loginMutation,
        createCompetitor: createCompetitorMutation,
        updateCompetitor: updateCompetitorMutation,
        updateCurrentCompetitor: updateCurrentCompetitorMutation,
        createEvent: createEventMutation,
        deleteEvent: deleteEventMutation,
        createCompetition: createCompetitionMutation,
        updateCompetition: updateCompetitionMutation,
        deleteCompetition: deleteCompetitionMutation,
        createResult: createResultMutation,
        deleteResult: deleteResultMutation,
    }
});


export default queryType;