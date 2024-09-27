import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <section>
      <div style={{ display: visible ? 'none' : '' }}>
        <button
          data-testid="open-blog-form-btn"
          onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </section>
  )

})

Toggable.displayName = 'Toggable'

export default Toggable

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}