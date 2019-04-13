import { observable, action } from 'mobx'
import Deal, { UDeal } from '../models/Deal'
import { dealService } from '../services/deal/DealService'

export default class DealDetailStore {
    @observable isLoading: boolean = true
    @observable isFailure:boolean = false
    @observable deal: UDeal | null = null

    @action setInitialDeal(data: UDeal) {
        this.deal = data
        this.isLoading = false
    }

    @action async fetchDetail(dealId: string) {
        try {
            const data = await dealService.fetchById(dealId)     
                this.isLoading = false
                this.deal = data
        } catch (e) {
                this.isLoading = false
                this.isFailure = true
        }
    }
}