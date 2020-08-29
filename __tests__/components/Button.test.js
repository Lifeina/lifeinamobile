import 'react-native'
import React from 'react'
import { Button, MainComponent } from '../../src/component/'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders button correctly', () => {
  expect(
    renderer.create(
      <MainComponent>
        <Button onPress={console.log}>btn</Button>
      </MainComponent>
    )
  ).toMatchSnapshot()
})
