import { SchemaFieldTypes } from 'redis';
import { itemsIndexKey, itemsKey } from '$services/keys';
import { client } from './client';

export const createIndexes = async () => {
	const indexes = await client.ft._LIST();

	const exists = indexes.find((index) => index === itemsIndexKey());

	if (exists) {
		return;
	}

	return client.ft.create(
		itemsIndexKey(),
		{
			name: {
				type: SchemaFieldTypes.TEXT,
				SORTABLE: true
			},
			description: {
				type: SchemaFieldTypes.TEXT,
				SORTABLE: false
			},
			ownerId: {
				type: SchemaFieldTypes.TAG,
				sortable: false
			},
			endingAt: {
				type: SchemaFieldTypes.TAG,
				sortable: false
			},
			bids: {
				type: SchemaFieldTypes.TAG,
				sortable: false
			},
			views: {
				type: SchemaFieldTypes.TAG,
				sortable: false
			},
			price: {
				type: SchemaFieldTypes.TAG,
				sortable: false
			},
			likes: {
				type: SchemaFieldTypes.TAG,
				sortable: false
			}
		} as any,
		{
			ON: 'HASH',
			PREFIX: itemsKey('')
		}
	);
};
