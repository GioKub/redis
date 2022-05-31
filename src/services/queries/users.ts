import { client } from "$services/redis";
import { usersKey } from "$services/keys";
import type { CreateUserDto } from "$services/types";
import { genId } from "$services/utils";

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
    const user = await client.HGETALL(usersKey(id))
    return(deserialize(id, user))
};

export const createUser = async (attrs: CreateUserDto) => {
    const id = genId()
    await client.HSET(usersKey(id), serialize(attrs))
    return id
};

export const serialize = (user: CreateUserDto) => {
    return {
        username: user.username,
        password: user.password
    }
}

export const deserialize = (id: string, user: {[key:string]: string}) =>{
    return{
        id,
        username: user.username,
        password: user.password
    }
}