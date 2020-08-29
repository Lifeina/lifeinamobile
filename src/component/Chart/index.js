import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  VictoryLine,
  VictoryChart,
  VictoryZoomContainer,
  VictoryLegend
} from 'victory-native'
import { theme } from './theme'

const Chart = ({ chartValue }) => {
  return (
    <View style={styles.container}>
      <VictoryChart
        domain={{ y: [0, 110] }}
        padding={70}
        height={350}
        theme={theme}
        animate={{ duration: 200 }}
        domainPadding={20}
        containerComponent={
          <VictoryZoomContainer
            zoomDomain={{ y: [0, 110] }}
            responsive
            zoomDimension="x"
          />
        }>
        <VictoryLegend
          x={155}
          y={0}
          title="Battery"
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: 'black' }, title: { fontSize: 20 } }}
          data={[
            {
              name: `Charge ${chartValue[0].batteryValue}%`,
              symbol: { fill: 'white' }
            }
          ]}
        />
        <VictoryLine
          style={{
            data: { stroke: 'white', strokeWidth: 2 },
            parent: { border: '1px solid #ccc' }
          }}
          data={chartValue}
          x="timeElapsed"
          y="batteryValue"
        />
      </VictoryChart>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  }
})

Chart.defaultProps = {
  chartValue: [
    { timeElapsed: 0, batteryValue: 100 },
    { timeElapsed: -15, batteryValue: 90 },
    { timeElapsed: -30, batteryValue: 80 },
    { timeElapsed: -45, batteryValue: 70 },
    { timeElapsed: -60, batteryValue: 60 },
    { timeElapsed: -75, batteryValue: 50 },
    { timeElapsed: -90, batteryValue: 40 },
    { timeElapsed: -105, batteryValue: 30 },
    { timeElapsed: -120, batteryValue: 20 },
    { timeElapsed: -135, batteryValue: 10 },
    { timeElapsed: -150, batteryValue: 1 }
  ]
}

export { Chart }
