import React from 'react'

const Checkbox = ({ id, name, label, checked, onChange }) => (
  <li>
    <input id={id} type="checkbox" name={name} checked={checked} value={id} onChange={onChange} />
    <label htmlFor={id}>{label}</label>
    <br />
  </li>
)

export default Checkbox
