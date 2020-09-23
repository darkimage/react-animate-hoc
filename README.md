# react-animate-hoc

> Hoc pattern for animate components using the awesome [animate.css](https://animate.style/) library

[![NPM](https://img.shields.io/npm/v/@darkimage/react-animate-hoc.svg)](https://www.npmjs.com/package/react-animate-hoc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-animate-hoc
```

## Demo Example and Documentation
you can watch the examples and the documentation at the **[DEMO WEBSITE](https://darkimage.github.io/react-animate-hoc/)**

## Basic Usage

```jsx
import React from 'react'

import { withAnimated } from 'react-animate-hoc'
import "animate.css" //dont forget to include the awesome animate.css

//if you are using your own component specify the `props.style` and `props.className` property
const MyAnimatedComponent = withAnimated((props) =>{
  return 
    <div style={props.style} className={props.className}>
      I'm a bouncing Div
    </div>
},{
  animation: "bounceIn" //specify an animation name from animate.css
});
```

## License

MIT © [darkimage](https://github.com/darkimage)
