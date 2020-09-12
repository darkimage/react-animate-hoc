import React from 'react'
import { withAnimated } from 'react-animate-hoc'
import 'animate.css'

const BounceIn = withAnimated(
  function (props) {
    return (
      <div style={props.style} className={props.className}>
        I'm a Bouncing div
      </div>
    )
  },
  {
    animation: 'bounceIn'
  }
)

const App = () => {
  return <BounceIn />
}

export default App
