import CommonModel from '../models/CommonModel'
import iApiMethod from './iApiMethod'

export default abstract class CommonService<T extends CommonModel> implements iApiMethod<T>  {

    rootURL: string = ""

    searchData(_: String): Promise<any[]> {
        throw new Error("Method not implemented.")
    }

    async getAll(): Promise<T[]> {
        try {
            const response = await fetch(this.rootURL)
            if (!response.ok) {
                throw new Error("Cannot get data")
            }
            return response.json()
        }
        catch (error) {
            throw error
        }
    }

    async fetchById(dix: String): Promise<T | null> {
        try {
            const response = await fetch(this.rootURL + '/' + dix)
            if (!response.ok) {
                throw new Error("Cannot fetch data")
            }
            return response.json()
        }
        catch (error) {
            throw error
        }
    }
}