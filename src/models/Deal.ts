import Cause from "./Cause"
import User from "./User"
import CommonModel from "./CommonModel"

export declare type Deals = Deal[]

export declare type UDeal = Deal | undefined

export default interface Deal extends CommonModel {
    key: string
    dealType: string
    title: string
    price: number
    makerPercentage: number
    description: string
    tags: string
    url: string
    media: string []
    cause?: Cause | null
    user?:  User | null
}
