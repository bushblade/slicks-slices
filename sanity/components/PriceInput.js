import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)))
}

const formatMoney = Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
}).format

class PriceInput extends Component {
  render() {
    const { type, value, onChange } = this.props
    return (
      <div>
        <h2>
          {type.title}- {value ? formatMoney(value / 100) : ''}
        </h2>
        <p>{type.description}</p>
        <input
          type={type.name}
          value={value}
          onChange={(event) => onChange(createPatchFrom(event.target.value))}
          ref={(element) => (this._inputElement = element)}
        />
      </div>
    )
  }
}

// Sanity accessibility
// PriceInput.focus = function () {
//   this._inputElement.focus()
// }

PriceInput.propTypes = {
  type: PropTypes.object,
  value: PropTypes.number,
  onChange: PropTypes.func,
}

export default PriceInput
