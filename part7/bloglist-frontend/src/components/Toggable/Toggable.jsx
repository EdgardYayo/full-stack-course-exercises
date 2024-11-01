import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

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
        <Button
          variant='contained'
          color={'info'}
          sx={{ textTransform: 'none', mt: 1 }}
          data-testid="open-blog-form-btn"
          onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <Button
          variant='contained'
          color={'error'}
          sx={{ textTransform: 'none', mt: 1 }}
          onClick={toggleVisibility}>
            Cancel
        </Button>
      </div>
    </section>
  )

})

Toggable.displayName = 'Toggable'

export default Toggable

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}