import { observable, action, runInAction, computed, IObservableValue } from 'mobx'
import { Deals } from '../models/Deal'
import { dealService } from '../services/deal/DealService'

export default class AppStore {
    @observable isLoading: boolean = true
    @observable isFailure: boolean = false
    @observable searchTerm: IObservableValue<string> = observable.box("")
    @observable deals: Deals = []
    @observable currentDealId: string | null = null

    constructor() {
        this.searchTerm.observe(() => {
            this.fetchDeals()
        }, true)
    }

    async fetchDeals() {
        dealService.searchData(this.searchTerm.get()).then(data => {
            runInAction(() => {
                this.isLoading = false
                this.deals = data
            })
        })
    }

    @action setSearchTerm(searchStr: string) {
        this.searchTerm.set(searchStr)
    }

    @action
    setCurrentDeal(dealId: string) {
        this.currentDealId = dealId
    }

    @action
    unsetCurrentDeal() {
        this.currentDealId = null
    }

    @computed get currentDeal() {
        return this.deals.find((deal) => deal.key === this.currentDealId)
    }
}