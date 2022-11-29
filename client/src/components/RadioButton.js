import React from 'react'
import '../styles/OptionButtons.css'


export const RadioButton = ({value, isSelected, onChange}) => {
  return (
    <label className='radio'>
        <input type='radio' value={value} checked={isSelected} onChange = {onChange} />
        {value}
    </label>
  )
}
