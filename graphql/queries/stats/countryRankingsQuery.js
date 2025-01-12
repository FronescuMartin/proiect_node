import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import db from '../../../models/index.js';
import competitionRankingsType from '../../types/stats/competitionRankingsType.js';

const countryRankingsResolver = async (_, { country }) => {
    const results = await db.Result.findAll({
        where: { '$Competitor.country$': country },
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

const countryRankingsQuery = {
    type: competitionRankingsType,
    args: {
        country: { type: GraphQLString },
    },
    resolve: countryRankingsResolver,
};

export default countryRankingsQuery;