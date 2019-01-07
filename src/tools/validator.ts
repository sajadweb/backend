import { getManager } from "typeorm";

export const findOneOrFail = async (entity: any, option: any): Promise<any> => {
    const entityManager = getManager();
    const en = await entityManager.findOneOrFail(entity, option);
    return en;
}
