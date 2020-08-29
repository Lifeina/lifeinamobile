import React, { useState } from 'react'
import { Layout, Text, Divider } from '@ui-kitten/components'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryLegend,
  VictoryContainer
} from 'victory-native'
import { theme } from '../../component/Chart/theme'

const ChartsView = () => {
  const { disconnect } = useStoreActions((actions) => actions.device)
  const [refreshing, setRefreshing] = useState(false)
  const { chartValues, values, value } = useStoreState(
    (state) => state.temperature
  )
  const chartValuesBattery = useStoreState((state) => state.battery.chartValues)
  const valuesBattery = useStoreState((state) => state.battery.values)
  const valueBattery = useStoreState((state) => state.battery.value)
  const { unit, language } = useStoreState((state) => state.settings)
  // const legendTemperature = unit === 'C' ? `${value} °C` : `${value} °F`
  const minTemperature = unit === 'C' ? 0 : 32
  const minAcceptableTemperature = unit === 'C' ? 2 : 35.6
  const maxAcceptableTemperature = unit === 'C' ? 8 : 46.4
  const maxTemperature = unit === 'C' ? 10 : 50
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
        <Text style={{ color: 'rgb(124, 122, 125)', marginTop: 30 }}>
          {translate[language]['pull']}
        </Text>
        <View style={styles.container}>
          <VictoryChart
            domain={{ x: [-10, 0], y: [minTemperature, maxTemperature] }}
            theme={theme}
            containerComponent={
              <VictoryContainer
                style={{
                  userSelect: 'auto !important',
                  pointerEvents: 'auto !important',
                  touchAction: 'auto !important'
                }}
              />
            }>
            <VictoryLine
              data={[
                { x: -10, y: maxAcceptableTemperature },
                { x: 0, y: maxAcceptableTemperature }
              ]}
              scale={{ x: 'time', y: 'linear' }}
              standalone={false}
              style={{
                data: { stroke: 'green', strokeWidth: 2 },
                parent: { border: '1px solid #ccc' }
              }}
            />
            <VictoryLine
              data={[
                { x: -10, y: minAcceptableTemperature },
                { x: 0, y: minAcceptableTemperature }
              ]}
              scale={{ x: 'time', y: 'linear' }}
              standalone={false}
              style={{
                data: { stroke: 'green', strokeWidth: 2 },
                parent: { border: '1px solid #ccc' }
              }}
            />
            <VictoryLine
              style={{
                data: { stroke: 'blue', strokeWidth: 2 },
                parent: { border: '1px solid #ccc' }
              }}
              data={values.length > 0 ? chartValues : []}
            />
          </VictoryChart>
          <Text category="h5" style={{ color: 'rgb(124, 122, 125)' }}>
            {translate[language]['temperature']} {value ? value : null}{' '}
            {value ? (unit === 'C' ? ' °C' : ' °F') : null}
          </Text>
          <Divider />
          <VictoryChart
            domain={{ x: [-10, 0], y: [0, 100] }}
            theme={theme}
            containerComponent={
              <VictoryContainer
                style={{
                  userSelect: 'auto !important',
                  pointerEvents: 'auto !important',
                  touchAction: 'auto !important'
                }}
              />
            }>
            <VictoryLine
              style={{
                data: { stroke: 'blue', strokeWidth: 2 },
                parent: { border: '1px solid #ccc' }
              }}
              data={valuesBattery.length > 0 ? chartValuesBattery : []}
            />
          </VictoryChart>
          <Text category="h5" style={{ color: 'rgb(124, 122, 125)' }}>
            {translate[language]['battery']}{' '}
            {valueBattery ? valueBattery + '%' : null}
          </Text>
        </View>
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
  }
})

export { ChartsView }
