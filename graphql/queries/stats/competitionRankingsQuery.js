import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../../models/index.js';
import competitionRankingsType from '../../types/stats/competitionRankingsType.js';

const competitionRankingsResolver = async (_, { competitionId }) => {
    const results = await db.Result.findAll({
        where: { competitionId },
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

    // sorting received results based on the WCA criteria
    // that being average time and then single time
    const eventRankings = Object.keys(rankings).map(eventId => {
        rankings[eventId].results.sort((a, b) => {
            if (a.average === b.average) {
                return a.single - b.single;
            }
            return a.average - b.average;
        });
        return {
            eventName: rankings[eventId].eventName,
            results: rankings[eventId].results
        };
    });

    return { eventRankings };
};

const competitionRankingsQuery = {
    type: competitionRankingsType,
    args: {
        competitionId: { type: GraphQLInt },
    },
    resolve: competitionRankingsResolver,
};

export default competitionRankingsQuery;