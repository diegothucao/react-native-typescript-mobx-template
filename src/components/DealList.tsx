import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import DealItem from './DealItem'


export interface Props {
    deals: any,
    onItemPress: any 
  }

class DealList extends React.Component<Props> {

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({ item }) => (
            <DealItem deal={item} onPress={this.props.onItemPress} />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee'
  },
})

export default DealList
