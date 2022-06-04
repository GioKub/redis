import { client } from "$services/redis";
import { itemsByViewsKey, itemsKey } from "$services/keys";

export const incrementView = async (itemId: string, userId: string) => {
    return Promise.all([
        client.HINCRBY(itemsKey(itemId), 'views', 1),
        client.ZINCRBY(itemsByViewsKey(), 1, itemId)
    ])
};
