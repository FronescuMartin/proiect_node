import competitorType from '../types/competitorType.js';
import { createCompetitor } from '../../core/services/createCompetitorService.js';
import competitorInputType from '../types/competitorInputType.js';

const createCompetitorMutationResolver = async (_, { competitor }, context) => {
    const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        console.log("User is not logged in");
        return false;
    }
    
    const createdCompetitor = await createCompetitor(competitor, context);

    return createdCompetitor;
}

const createCompetitorMutation = {
    type: competitorType,
    args: {
        competitor: {type: competitorInputType},
    },
    resolve: createCompetitorMutationResolver,
};

export default createCompetitorMutation;