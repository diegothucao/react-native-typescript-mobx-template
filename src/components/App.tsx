import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import { observer, inject } from "mobx-react"
import DealList from './DealList'
import DealDetail from './DealDetail'
import SearchBar from './SearchBar'
import AppStore from '../stores/AppStore'


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
    if (appStore.currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetail
            initialDealData={appStore.currentDeal}
            onBack={this.unsetCurrentDeal}
          />
        </View>
      )
    }

    return (
      <View style={styles.main}>
        <SearchBar searchDeals={this.searchDeals} searchTerm={appStore.searchTerm.get()}/>
        <DealList deals={appStore.deals} onItemPress={this.setCurrentDeal} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    marginTop: 30,
  },
  header: {
    fontSize: 40,
  },
})

export default App
