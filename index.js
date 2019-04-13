/**
 * @format
 */
import React from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'mobx-react'
import App from './src/components/App';
import { name as appName } from './app.json';
import stores from './src/stores'

const MobX = () => (<Provider {...stores}>
    <App/>
</Provider>)

AppRegistry.registerComponent(appName, () => MobX);