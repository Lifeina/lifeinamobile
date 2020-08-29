import { Platform, PermissionsAndroid } from 'react-native'
import { action, thunk } from 'easy-peasy'
import { BleManager } from 'react-native-ble-plx'
import { Buffer } from 'buffer'

const deviceModel = {
  lifeinaboxName: 'LifeinaBox',
  lifeinaboxService: '0000fee9-0000-1000-8000-00805f9b34fb',
  lifeinaboxCharacteristicNotify: 'd44bc439-abfd-45a2-b575-925416129601',
  lifeinaboxCharacteristic: 'd44bc439-abfd-45a2-b575-925416129600',
  bleManager: {},
  device: {},
  connectedDevice: {},
  isPoweredOn: false,
  isConnected: false,
  isPending: false,
  updateBleManager: action((state, payload) => {
    state.bleManager = payload
  }),
  updateDevice: action((state, payload) => {
    state.device = payload
  }),
  updateConnectedDevice: action((state, payload) => {
    state.device = payload
  }),
  updatePoweredOn: action((state, payload) => {
    state.isPoweredOn = payload
  }),
  updateConnected: action((state, payload) => {
    state.isConnected = payload
  }),
  updatePending: action((state, payload) => {
    state.isPending = payload
  }),
  connect: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      try {
        actions.updatePending(true)

        // Ask Android Permissions
        // console.log('Ask Permissions')
        Platform.OS !== 'ios' &&
          (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
              title: 'Accept authorisation for lifeina box',
              message: 'Accept authorisation for lifeina box.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK'
            }
          ))

        // Init BleManager
        // console.log('Init BLE Manager')
        const bleManager = new BleManager()
        actions.updateBleManager(bleManager)

        // Check PoweredOn
        // console.log('Check PoweredOn')
        const subscription = bleManager.onStateChange((state) => {
          if (state === 'PoweredOn') {
            actions.updatePoweredOn(true)

            // Enable debug
            bleManager.setLogLevel('Debug')

            // Scan
            // console.log('Scan')
            bleManager.startDeviceScan(null, null, async (error, device) => {
              if (error) {
                // console.log(error)
                return
              }

              // console.log(device)
              actions.updateDevice(device)

              // isConnectable avaiable only on iOS
              const { isConnectable, localName } = device

              if (
                /*isConnectable && */ localName === getState().lifeinaboxName
              ) {
                bleManager.stopDeviceScan()
                // console.log('Connectable')

                // connectedDevice === device object
                const connectedDevice = await device.connect()
                // console.log(connectedDevice)
                actions.updateConnectedDevice(connectedDevice)
                actions.updateConnected(await connectedDevice.isConnected())

                // :-)
                await connectedDevice.discoverAllServicesAndCharacteristics()
                const services = await connectedDevice.services()
                let service = null
                for (const myservice of services) {
                  // console.log(myservice.uuid)
                  service = myservice.uuid
                }
                const characteristics = await connectedDevice.characteristicsForService(
                  service
                )
                for (const characteristic of characteristics) {
                  // console.log(characteristic.uuid)
                  // console.log(characteristic.isWritableWithResponse)
                }

                connectedDevice.monitorCharacteristicForService(
                  getState().lifeinaboxService,
                  getState().lifeinaboxCharacteristicNotify,
                  async (error, char) => {
                    if (error) {
                      // console.log(error)
                      return
                    }

                    actions.updatePending(false)
                    // console.log('char', char)

                    // battery
                    if (
                      Buffer.from(char.value.substr(0, 3), 'base64').toString(
                        'hex'
                      ) === 'aa8e'
                    ) {
                      const fullBatteryHex = Buffer.from(
                        char.value,
                        'base64'
                      ).toString('hex')
                      // console.log('Battery ', fullBatteryHex)
                      const batteryHexGroup = fullBatteryHex.match(/.{2}/g)
                      // console.log(batteryHexGroup)
                      const binaryBattery = parseInt(batteryHexGroup[2], 16)
                        .toString(2)
                        .padStart(8, '0')

                      // console.log('battery:', binaryBattery)
                      // console.log('battery:', binaryBattery.substr(1))
                      // console.log('battery:', parseInt(binaryBattery.substr(1), 2))

                      if (binaryBattery === '10000000') {
                        // console.log('Plugged in main')
                        getStoreActions().battery.updateStatus(
                          'Plugged in main'
                        )
                      }

                      if (binaryBattery < '10000000') {
                        // console.log('Discharging')
                        getStoreActions().battery.updateStatus('Discharging')
                        getStoreActions().battery.addValue(
                          parseInt(binaryBattery.substr(1), 2) >= 100
                            ? 100
                            : parseInt(binaryBattery.substr(1), 2)
                        )
                      }

                      if (binaryBattery > '10000000') {
                        // console.log('In Charge')
                        getStoreActions().battery.updateStatus('In Charge')
                        getStoreActions().battery.addValue(
                          parseInt(binaryBattery.substr(1), 2) >= 100
                            ? 100
                            : parseInt(binaryBattery.substr(1), 2)
                        )
                      }
                    }

                    // temperature
                    if (
                      Buffer.from(char.value.substr(0, 3), 'base64').toString(
                        'hex'
                      ) === 'aa8f'
                    ) {
                      const fullTemperaturesHex = Buffer.from(
                        char.value,
                        'base64'
                      ).toString('hex')
                      const withoutPrefix = fullTemperaturesHex.substr(4)
                      const temperaturesHex = withoutPrefix.substr(0, 48)
                      const temperaturesHexGroup = temperaturesHex.match(
                        /.{2}/g
                      )
                      for (let i = 0; i < temperaturesHexGroup.length; i++) {
                        console.log(
                          'int',
                          parseInt(temperaturesHexGroup[i], 16)
                        )
                        const hex2dec = parseInt(temperaturesHexGroup[i], 16)
                        console.log('hex2dec', hex2dec)
                        const celcius = hex2dec / 10
                        console.log('celcius', celcius)
                        console.log('********')
                        getStoreActions().temperature.prepareValue(celcius)
                      }
                    }
                  }
                )

                // tmp
                await connectedDevice.writeCharacteristicWithResponseForService(
                  getState().lifeinaboxService,
                  getState().lifeinaboxCharacteristic,
                  Buffer.from('AA8F1855', 'hex').toString('base64')
                )

                // // actions.updateDevice(connectedDevice)

                // battery
                await connectedDevice.writeCharacteristicWithResponseForService(
                  getState().lifeinaboxService,
                  getState().lifeinaboxCharacteristic,
                  Buffer.from('AA8EFF55', 'hex').toString('base64')
                )

                // actions.updateDevice(connectedDevice)
              }
            })
            subscription.remove()
          }
        }, true)
      } catch (error) {
        // console.log(error)
      }
    }
  ),
  disconnect: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      try {
        // console.log('disconnect')
        // disconnect a device
        if (getState().device) {
          await getState().device.cancelConnection()
        }
        // detroy instance
        getState().bleManager.destroy()
        // reset state
        actions.updateDevice({})
        actions.updateConnectedDevice({})
        actions.updateBleManager({})
        actions.updateConnected(false)
        actions.updatePoweredOn(false)
        getStoreActions().temperature.reset()
        if (payload.refresh) {
          actions.connect() // refresh
          getStoreActions().battery.resetRefresh()
        } else {
          actions.updatePending(false)
          getStoreActions().battery.reset()
        }
      } catch (error) {
        // console.log(error)
      }
    }
  )
}

export default deviceModel
