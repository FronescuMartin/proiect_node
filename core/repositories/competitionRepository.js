//useless??

import db from '../../models/index.js';
export const findOrCreateCompetitions = async (tags) => {
    const tagsPromises = tags.map(async (tag) => {
        const foundTag = await db.Tag.findOne({
            where: {
                name: tag,
            }
        });

        if(!foundTag) {
            const createdTag = await db.Tag.create({
                name: tag,
            });

            return createdTag;
        }

        return foundTag;
    });

    return Promise.all(tagsPromises);
}