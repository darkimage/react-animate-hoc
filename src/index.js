import React from 'react'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function withAnimated(Component, animateClass) {
  const withAnimated = (props) => {
    const classes = []
    const cssKeyClasses = ['animation', 'delay', 'speed']
    animateClass = { ...animateClass, ...props.animateCss }
    for (const key of cssKeyClasses) {
      if (Object.prototype.hasOwnProperty.call(animateClass, key)) {
        const value = animateClass[key]
        if (key !== 'animation') {
          classes.push(`animate__${key}-${value}`)
        } else {
          classes.push(`animate__${value}`)
        }
      }
    }
    const { className, style, ...rest } = props
    const { animation, delay, speed, ...animateStyle } = animateClass
    const styleElem = { ...style, ...animateStyle }
    return (
      <Component
        {...rest}
        style={styleElem}
        className={`${className} ${
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
        animateCss: constructAnimCss(i)
      })
    })
    return <Component {...props}>{children}</Component>
  }
  withAnimatedChildren.displayName = `withAnimatedChildren(${getDisplayName(
    Component
  )})`
  return withAnimatedChildren
}
