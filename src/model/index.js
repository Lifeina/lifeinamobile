import temperatureModel from './temperature-model'
import batteryModel from './battery-model'
import settingsModel from './settings-model'
import deviceModel from './device-model'
import languagesModel from './languages-model'

const storeModel = {
  temperature: temperatureModel,
  battery: batteryModel,
  settings: settingsModel,
  device: deviceModel,
  translation: languagesModel
}

export default storeModel
