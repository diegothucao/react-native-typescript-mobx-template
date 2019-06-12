# React Native, Typescript and Mobx
This is an essential example to build react-native app using Typescript and Mobx

Step to run
1. Clone the [repo](https://github.com/diegothucao/react-native-typescript-mobx-template)
2. `yarn install` OR `npm install`
3. `react-native eject`
4. `react-native run-ios` OR `react-native run-android`

Define model 

```typescript 
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
```

Define store 

```typescript 
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
```

Call in component 

```typescript 
export interface Props {
  appStore: AppStore
}

@inject("appStore") @observer
class App extends React.Component<Props> {

  searchDeals = (searchTerm: string) => {
    this.props.appStore.setSearchTerm(searchTerm)
  }

  setCurrentDeal = (dealId: string) => {
    this.props.appStore.setCurrentDeal(dealId)
  }

  unsetCurrentDeal = () => {
    this.props.appStore.unsetCurrentDeal()
  }

  render() {
    const appStore = this.props.appStore
}
}
```
If you see any issue, please do not hesitate to create an issue here or can contact me via email cao.trung.thu@gmail.com or [Linkedin](https://www.linkedin.com/in/diegothucao/)

Thanks

references
1. https://facebook.github.io/react-native/docs/tutorial
2. https://github.com/jscomplete/react-native-essential-training
3. https://mobx.js.org
4. https://www.tutorialspoint.com/typescript/
5. https://www.tutorialspoint.com/es6

