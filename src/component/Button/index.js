import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'

const customButton = (props) => {
  const { children, onPress } = props

  return (
    <Button style={styles.button} onPress={onPress}>
      <Text styles={styles.textBtn}>{children}</Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 16,
    backgroundColor: 'white',
    borderColor: 'white'
  },
  textBtn: {
    textAlign: 'center'
  }
})

customButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  accessoryLeft: PropTypes.func
}

export { customButton as Button }
