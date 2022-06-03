import { client } from '$services/redis';
import { userLikesKey, itemsKey } from '$services/keys';
import { getItems } from './items';

export const userLikesItem = async (itemId: string, userId: string) => {};

export const likedItems = async (userId: string) => {
	const ids = await client.SMEMBERS(userLikesKey(userId))

	return getItems(ids)
};

export const likeItem = async (itemId: string, userId: string) => {
	const inserted = await client.sAdd(userLikesKey(userId), itemId);

	if(inserted){
		return client.HINCRBY(itemsKey(itemId), 'likes', 1)
	}
};

export const unlikeItem = async (itemId: string, userId: string) => {
	const removed = await client.sRem(userLikesKey(userId), itemId);

	if(removed){
		return client.HINCRBY(itemsKey(itemId), 'likes', -1)
	}
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {};
