import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Layout,
  Text,
  IndexPath,
  Select,
  SelectItem,
  Button
} from '@ui-kitten/components'
import { useStoreActions, useStoreState } from 'easy-peasy'

const SettingsView = () => {
  const { disconnect } = useStoreActions((actions) => actions.device)
  const { isConnected } = useStoreState((state) => state.device)
  const { unit, language } = useStoreState((state) => state.settings)
  const { updateUnit, updateLanguage } = useStoreActions(
    (actions) => actions.settings
  )
  const {
    transformArrayCelciusToFahrenheit,
    transformArrayFahrenheitToCelcius
  } = useStoreActions((actions) => actions.temperature)
  const translate = useStoreState((state) => state.translation.languages)

  return (
    <Layout style={styles.container}>
      <View style={styles.body}>
        <View style={styles.select}>
          <Text category="h6" style={styles.placeholder}>
            {translate[language]['unity']}
          </Text>
          <Select
            value={unit === 'C' ? 'Celsius °C' : 'Fahrenheit ºF'}
            selectedIndex={new IndexPath(unit === 'C' ? 0 : 1)}
            onSelect={({ row }) => {
              // console.log(row)
              updateUnit(row === 0 ? 'C' : 'F')
              row === 0
                ? transformArrayFahrenheitToCelcius()
                : transformArrayCelciusToFahrenheit()
            }}>
            <SelectItem key={0} title="Celsius °C" />
            <SelectItem key={1} title="Fahrenheit ºF" />
          </Select>
        </View>
        <View style={styles.select}>
          <Text category="h6" style={styles.placeholder}>
            {translate[language]['language']}
          </Text>
          <Select
            value={language === 'en_GB' ? 'English' : 'Francais'}
            selectedIndex={new IndexPath(language === 'en_GB' ? 0 : 1)}
            onSelect={({ row }) => {
              // console.log(row)
              updateLanguage(row === 0 ? 'en_GB' : 'fr_FR')
            }}>
            <SelectItem key={0} title="English" />
            <SelectItem key={1} title="Francais" />
          </Select>
        </View>

        {isConnected ? (
          <View style={styles.select}>
            <Text category="h6" style={styles.placeholder}>
              LifeinaBox
            </Text>
            <Button
              style={{
                marginVertical: 16,
                backgroundColor: 'white',
                borderColor: 'white'
              }}
              onPress={() => disconnect({ refresh: false })}>
              <Text>{translate[language]['disconnect']}</Text>
            </Button>
          </View>
        ) : null}
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgb(54, 188, 238)'
  },
  body: {
    flex: 1,
    width: '90%',
    justifyContent: 'flex-start',
    marginTop: 100
  },
  select: {
    marginTop: 20
  },
  placeholder: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5
  }
})

export { SettingsView }
