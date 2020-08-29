import 'react-native'
import React from 'react'
import { Chart, MainComponent } from '../../src/component/'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders chart correctly', () => {
  expect(
    renderer.create(
      <MainComponent>
        <Chart />
      </MainComponent>
    )
  ).toMatchSnapshot()
})
