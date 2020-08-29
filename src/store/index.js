import { createStore } from 'easy-peasy'
import storeModel from '../model'
import { composeWithDevTools } from 'remote-redux-devtools';

let storeEnhancers = []
if (__DEV__) {
  console.log("DEV mode")
  const reactotron = require("./reactotronConfig").default;
  reactotron.initiate();
  // storeEnhancers = reactotron.createEnhancer();
  storeEnhancers = [...storeEnhancers, reactotron.createEnhancer()];
}

export const store = createStore(storeModel, {
  compose: composeWithDevTools({ realtime: true, trace: true }),
  enhancers: [...storeEnhancers],
})
