import 'react-native'
import React from 'react'
import { Select, MainComponent } from '../../src/component/'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders select correctly', () => {
  expect(
    renderer.create(
      <MainComponent>
        <Select data={['Celsius °C', 'Fahrenheit ºF']}>btn</Select>
      </MainComponent>
    )
  ).toMatchSnapshot()
})
