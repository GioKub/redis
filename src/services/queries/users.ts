import { client } from "$services/redis";
import { usersKey } from "$services/keys";
import type { CreateUserDto } from "$services/types";
import { genId } from "$services/utils";

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {};

export const createUser = async (attrs: CreateUserDto) => {
    const id = genId()
    await client.HSET(usersKey(id),{
        username: attrs.username,
        password: attrs.password
    })

    return id
};
