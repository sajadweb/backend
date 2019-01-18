export const findOneOrFail = async (entity: any, option: any): Promise<any> => {
    const en = await entity.findOneOrFail(entity, option);
    return en;
}
