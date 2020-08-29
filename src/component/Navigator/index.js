import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon
} from '@ui-kitten/components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeView, SettingsView, ChartsView } from '../../views'

const BottomTab = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const HomeIcon = (style) => <Icon {...style} name="home-outline" />
  const ChartsIcon = (style) => <Icon {...style} name="bar-chart-outline" />
  const SettingsIcon = (style) => <Icon {...style} name="settings-2-outline" />

  const onSelect = (index) => {
    setSelectedIndex(index)
    navigation.navigate(state.routeNames[index])
  }

  return (
    <BottomNavigation
      style={styles.bottomNavigation}
      indicatorStyle={styles.indicator}
      selectedIndex={selectedIndex}
      onSelect={onSelect}>
      <BottomNavigationTab icon={HomeIcon} title="Home" />
      <BottomNavigationTab icon={ChartsIcon} title="Charts" />
      <BottomNavigationTab icon={SettingsIcon} title="Settings" />
    </BottomNavigation>
  )
}

const TabNavigator = () => {
  return (
    <BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <BottomTab.Screen
        name="Home"
        style={styles.container}
        component={HomeView}
      />
      <BottomTab.Screen
        name="Charts"
        style={styles.container}
        component={ChartsView}
      />
      <BottomTab.Screen
        name="Settings"
        style={styles.container}
        component={SettingsView}
      />
    </BottomTab.Navigator>
  )
}

const styles = StyleSheet.create({
  bottomNavigation: { backgroundColor: 'white' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35
  },
  spinner: {
    height: 100,
    display: 'flex',
    justifyContent: 'center'
  }
})

export { TabNavigator }
