import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppRegistry } from 'react-native'
import { name as LifeinaMobile } from './app.json'
import { MainComponent, TabNavigator } from './src/component'
import SplashScreen from 'react-native-splash-screen'

export const App = () => {
  useEffect(() => {
    SplashScreen.hide()
    // I Think we should check authorisations and if Ble is enabled here just before hiding splashscreen
  }, [])

  return (
    <MainComponent>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </MainComponent>
  )
}

AppRegistry.registerComponent(LifeinaMobile, () => App)
