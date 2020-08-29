import React, { useState } from 'react'
import { Text, Divider, Layout, Card, Button } from '@ui-kitten/components'
import { Image, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useStoreActions, useStoreState } from 'easy-peasy'

const HomeView = () => {
  const { connect, disconnect } = useStoreActions((actions) => actions.device)
  const { isConnected, isPending } = useStoreState((state) => state.device)
  const [refreshing, setRefreshing] = useState(false)
  const temperatureValue = useStoreState((state) => state.temperature.value)
  const batteryValue = useStoreState((state) => state.battery.value)
  const batteryStatus = useStoreState((state) => state.battery.status)
  const { unit, language } = useStoreState((state) => state.settings)
  const translate = useStoreState((state) => state.translation.languages)

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      style={{
        backgroundColor: 'rgb(54, 188, 238)'
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => disconnect({ refresh: true })}
        />
      }>
      <Layout style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-lifeina.png')}
        />
        <Divider />

        {!isConnected && !isPending ? (
          <>
            <Text style={styles.welcomeMsg} category="h3">
              {/* Welcome to Lifeina */}
              {translate[language]['welcome']}
            </Text>
            <Button
              style={{
                marginVertical: 16,
                backgroundColor: 'white',
                borderColor: 'white'
              }}
              onPress={() => connect()}>
              <Text>{translate[language]['find']}</Text>
            </Button>
          </>
        ) : isConnected && !isPending ? (
          <>
            <Divider />
            <Text category="h1" style={styles.welcomeMsg}>
              {temperatureValue} {unit === 'C' ? ' °C' : ' °F'}
            </Text>
            <Divider />
            <Text category="h1" style={styles.welcomeMsg}>
              {batteryStatus === 'Plugged in main'
                ? translate[language]['plugged']
                : batteryStatus === 'In Charge'
                ? translate[language]['inCharge']
                : batteryStatus === 'Discharging'
                ? translate[language]['discharging']
                : null}
            </Text>
            {batteryValue ? (
              <Text category="h1" style={styles.welcomeMsg}>
                {batteryValue} %
              </Text>
            ) : null}
            <Divider />
            <Text style={{ color: 'rgb(124, 122, 125)' }}>
              {translate[language]['pull']}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.welcomeMsg} category="h3">
              {translate[language]['welcome']}
            </Text>
            <Card style={{ margin: 2 }} status="info">
              <Text>{translate[language]['loading']}</Text>
            </Card>
          </>
        )}
      </Layout>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(54, 188, 238)'
  },
  logo: {
    marginBottom: 30,
    height: 108,
    width: 102
  },
  welcomeMsg: {
    marginBottom: 30,
    color: 'white'
  }
})

export { HomeView }
