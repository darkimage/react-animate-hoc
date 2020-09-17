import React from 'react'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function isFunction(obj) { return typeof obj === "function" };
function isArray(obj) { return Array.isArray(obj) };

function retriveAnimateVariables() {
  const doc = getComputedStyle(document.documentElement)
  return {
    duration: doc.getPropertyValue("--animate-duration"),
    delay: doc.getPropertyValue("--animate-delay"),
    delay: doc.getPropertyValue("--animate-repeat"),
  }
}

function setProperty(prop, props, defaultSet, arraySet) {
  if (isFunction(prop)) {
    prop = prop(props, retriveAnimateVariables())
  }
  if (prop) {
    if (isArray(prop)) {
      arraySet(prop)
    } else {
      defaultSet(prop)
    }
  }
}

export function withAnimated(Component, animateClass) {


  const withAnimated = function (props) {
    console.log(props)
    const classes = []
    const animateData = { ...animateClass, ...(props.animatecss) }
    const { animation, delay, speed, infinite, ...animateStyle } = animateData
    const styleElem = { ...style, ...animateStyle }

    setProperty(animation, props,
      (value) => classes.push(`animate__${value}`),
      (value) => styleElem.animationName = value.join(',')
    );
    setProperty(infinite, props,
      () => classes.push(`animate__infinite`),
      () => { throw 'infinite property cannot be an array!' }
    )
    setProperty(speed, props,
      (value) => {
        if (['slow','slower','fast','faster'].includes(value)) {
          classes.push(`animate__${value}`)
        } else if(typeof value === "string") {
          styleElem.animationDuration = value
        } else {
          styleElem.animationDuration = `${value}s`
        }
      },
      (value) => styleElem.animationDuration = value.join(',')
    )
    setProperty(delay, props,
      (value) => {
        if (['2s', '3s', '4s', '5s', 2, 3, 4, 5].includes(value)) {
          if (typeof value === "number") {
            value = `${value}s`
          }
          classes.push(`animate__delay-${value}`)
        } else {
          if (typeof value == "string") {
            styleElem.animationDelay = value
          } else {
            styleElem.animationDelay = `${value}s`
          }
        }
      },
      (value) => styleElem.animationDelay = value.join(',')
    )

    const { className, style, animatecss, ...rest } = props
    return (
      <Component
        {...rest}
        style={styleElem}
        className={`${className ? className : ''} ${classes.length !== 0 ? 'animate__animated' : ''} ${classes.join(' ')}`}
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
