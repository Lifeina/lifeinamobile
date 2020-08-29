import 'react-native'
import React from 'react'
import { SettingsView } from '../../src/views'
import { MainComponent } from '../../src/component'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders Settings view correctly', () => {
  expect(
    renderer.create(
      <MainComponent>
        <SettingsView />
      </MainComponent>
    )
  ).toMatchSnapshot()
})
