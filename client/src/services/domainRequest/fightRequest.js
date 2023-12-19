import { get, post, put } from "../requestHelper";

const entity = 'fights';

export const getFights = async () => {
    return await get(entity);
}

export const createFight = async (body) => {
    return await post(entity, body);
}

export const updateFight = async (id, body) => {
    return await put(entity, id, body)
}