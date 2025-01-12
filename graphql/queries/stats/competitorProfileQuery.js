import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import db from '../../../models/index.js';
import competitorProfileType from '../../types/stats/competitorProfileType.js';

const competitorProfileResolver = async (_, { competitorId }) => {
    const results = await db.Result.findAll({
        where: { competitorId },
        include: [db.Event, db.Competitor],
    });

    // reduces the rankings to a single object with eventIds as keys
    // having only event names and result objects
    const rankings = results.reduce((acc, result) => {
        const eventId = result.eventId;
        if (!acc[eventId]) {
            acc[eventId] = {
                eventName: result.Event.name,
                results: []
            };
        }
        acc[eventId].results.push(result);
        return acc;
    }, {});

    // calculating the best average and best single for each event
    const eventBest = Object.keys(rankings).map(eventId => {
        // breaking down results into minimum single and minimum average and average of averages

        const averageList = rankings[eventId].results.map(r => r.average);
        const bestSingle = Math.min(...rankings[eventId].results.map(r => r.single));
        const bestAverage = Math.min(...averageList);
        const averageAverage = averageList.reduce((prev, curr) => prev + curr) / averageList.length;
        return {
            eventName: rankings[eventId].eventName,
            bestSingle,
            bestAverage,
            averageAverage
        };
    });

    return { eventBest };
};

const competitorProfileQuery = {
    type: competitorProfileType,
    args: {
        competitorId: { type: GraphQLInt },
    },
    resolve: competitorProfileResolver,
};

export default competitorProfileQuery;