import CommonModel from '../models/CommonModel'
export default interface iApiMethod<T extends CommonModel> {
    getAll(): Promise<T[]>
    searchData(search: String): Promise<T[]>
    fetchById(dix: String): Promise<T | null>
}