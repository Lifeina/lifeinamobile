import React, { useState } from 'react'
import { IndexPath, Select, SelectItem } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
const CustomSelect = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0))

  const displayValue = data[selectedIndex.row]

  const renderOption = (title, index) => (
    <SelectItem key={index} title={title} />
  )

  return (
    <Select
      value={displayValue}
      selectedIndex={selectedIndex}
      onSelect={(index) => {
        // console.log(index)
        setSelectedIndex(index)
      }}
      style={styles.select}>
      {data.map(renderOption)}
    </Select>
  )
}

const styles = StyleSheet.create({
  select: { width: '100%', textAlign: 'center' }
})

export { CustomSelect as Select }
