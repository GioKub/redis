import { client } from '$services/redis';
import { itemsByViewsKey, itemsKey, itemsViewsKey } from '$services/keys';

export const incrementView = async (itemId: string, userId: string) => {
	const inserted = await client.PFADD(itemsViewsKey(itemId), userId);

	if (inserted) {
		return Promise.all([
			client.HINCRBY(itemsKey(itemId), 'views', 1),
			client.ZINCRBY(itemsByViewsKey(), 1, itemId)
		]);
	}
};
