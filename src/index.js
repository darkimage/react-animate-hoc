import React from 'react'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function withAnimated(Component, animateClass) {
  const withAnimated = function (props) {
    console.log(props)
    const classes = []
    const cssKeyClasses = ['animation', 'delay', 'speed', 'duration', 'infinite']
    const animateData = { ...animateClass, ...(props.animatecss) }
    for (const key of cssKeyClasses) {
      if (Object.prototype.hasOwnProperty.call(animateData, key)) {
        const value = animateData[key]
        if (key !== 'animation' && key !== 'infinite') {
          classes.push(`animate__${key}-${value}`)
        }
        if (key === 'infinite') {
          if (value) {
            classes.push(`animate__${key}`)
          }
        } else {
          if (!Array.isArray(value)) {
            classes.push(`animate__${value}`)
          }
        }
      }
    }
    const { className, style, animatecss, ...rest } = props
    const { animation, delay, speed, infinite, ...animateStyle } = animateData
    const styleElem = { ...style, ...animateStyle }
    if (Array.isArray(animation)) {
      styleElem.animationName = animation.join(',')
    }
    return (
      <Component
        {...rest}
        style={styleElem}
        className={`${className ? className : ''} ${
          classes.length !== 0 ? 'animate__animated' : ''
        } ${classes.join(' ')}`}
      />
    )
  }
  withAnimated.displayName = `WithAnimated(${getDisplayName(Component)})`
  return withAnimated
}

export function withAnimatedGroup(Component, animateOptions) {
  const computeTime = (offset, damping, startOffset) => {
    const sec = offset * damping + (startOffset || 0)
    return sec ? `${sec}s` : undefined
  }

  const constructAnimCss = (offset) => {
    const css = {
      animationDelay: computeTime(
        offset,
        animateOptions.dampingDelay,
        animateOptions.delay
      ),
      animationDuration: computeTime(
        offset,
        animateOptions.dampingDuration,
        animateOptions.startOffset
      )
    }
    Object.keys(css).forEach((key) => css[key] === undefined && delete css[key])
    return css
  }
  const withAnimatedChildren = (props) => {
    const children = React.Children.map(props.children, (Child, i) => {
      return React.cloneElement(Child, {
        animatecss: constructAnimCss(i)
      })
    })
    return <Component {...props}>{children}</Component>
  }
  withAnimatedChildren.displayName = `withAnimatedChildren(${getDisplayName(
    Component
  )})`
  return withAnimatedChildren
}
