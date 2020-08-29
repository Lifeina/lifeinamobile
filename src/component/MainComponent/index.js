import React from 'react'
import * as eva from '@eva-design/eva'
import { store } from '../../store'
import { StoreProvider } from 'easy-peasy'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { mapping, light } from '@eva-design/eva'
import { default as appTheme } from '../../assets/custom-theme.json'
import PropTypes from 'prop-types'

const MainComponent = ({ children }) => (
  <StoreProvider store={store}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
      mapping={mapping}
      {...eva}
      theme={{ ...light, ...appTheme }}>
      {children}
    </ApplicationProvider>
  </StoreProvider>
)

MainComponent.propTypes = {
  children: PropTypes.node.isRequired
}

export { MainComponent }
