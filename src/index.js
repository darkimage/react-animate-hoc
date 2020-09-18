import React, {useEffect, useState} from 'react'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function isFunction(obj) { return typeof obj === "function" };
function isArray(obj) { return Array.isArray(obj) };

function retriveAnimateVariables() {
  const doc = getComputedStyle(document.documentElement)
  return {
    duration: parseFloat(doc.getPropertyValue("--animate-duration")),
    delay: parseFloat(doc.getPropertyValue("--animate-delay")),
    repeat: parseFloat(doc.getPropertyValue("--animate-repeat")),
  }
}

function setProperty(prop, props, defaultSet = (val) => val, arraySet = (val) => val.join(',')) {
  if (isFunction(prop)) {
    prop = prop(props, retriveAnimateVariables())
  }
  if (prop) {
    if (isArray(prop)) {
      return arraySet(prop)
    } else {
      return defaultSet(prop)
    }
  }
}

export function withAnimated(Component, animateClass) {

  const withAnimated = function (props) {
    // console.log(props)
    const classes = []
    const animateData = { ...animateClass, ...(props.animatecss) }
    const { animation, delay, speed, infinite, wait, loop, ...animateStyle } = animateData
    const styleElem = { ...style, ...animateStyle }
    const [removeInfinite, setRemoveInfinite] = useState(false)
    const animVariables = retriveAnimateVariables()
    // var delayWaitClass = ''; 
    // var delayWaitCss = ''; 
    // var removeInfinite = false;

    setProperty(animation, props,
      (value) => {
        if (!wait) {
          classes.push(`animate__${value}`)
        }
      },
      (value) => styleElem.animationName = value.join(',')
    );
    setProperty(infinite, props,
      () => {
        if (!wait) {
          classes.push(`animate__infinite`)
        }
      },
      () => { throw 'infinite property cannot be an array!' }
    )
    setProperty(speed, props,
      (value) => {
        if (['slow', 'slower', 'fast', 'faster'].includes(value)) {
          classes.push(`animate__${value}`)
        } else if (typeof value === "string") {
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
          classes.push(`animate__delay-${value}`);
        } else {
          if (typeof value == "string") {
            styleElem.animationDelay = val;ue
          } else {
            styleElem.animationDelay = `${value}s`;
          }
        }
      },
      (value) => styleElem.animationDelay = value.join(',')
    )

    useEffect(() => {
      if (infinite && wait) {
        setInterval(removeInfinite => {
          setRemoveInfinite(!removeInfinite)
          setTimeout(() => {
            setRemoveInfinite(false)
          }, 100)
        }, (loop ? wait : wait + (speed || animVariables.duration) + (delay || 0)) * 1000)
      }
    },[])
    
    const { className, style, animatecss, ...rest } = props

    const cssWaitInfinite = !removeInfinite ? `animate__${animation}` : ''
    const animateToggle = wait ? `animate__animated ${cssWaitInfinite}` : `${classes.length !== 0 ? 'animate__animated' : ''}`;

    return (
      <Component
        {...rest}
        style={styleElem}
        className={`${className || ''} ${animateToggle} ${classes.join(' ')}`}
      />
    )
  }
  withAnimated.displayName = `WithAnimated(${getDisplayName(Component)})`
  return withAnimated
}

export function withAnimatedGroup(Component, animateOptions) {
  const computeTime = (offset, damping, startOffset) => {
    const sec = offset * (damping !== undefined ? damping : 1) + (startOffset || 0)
    return sec
  }
  const calculateTotalWait = (props) => {
    var wait = 0;
    const animateVariables = retriveAnimateVariables();
    for (let i = 0; i < props.children.length; i++) {
      var currWait = computeTime(i, animateOptions.dampingDelay, animateOptions.delay);
      const currSpeed = computeTime(i, animateOptions.dampingSpeed || 0, (animateOptions.speed || animateVariables.duration));
      if (i === 0) {
        wait += currSpeed + currWait; 
      } else {
        wait += (currWait + currSpeed ) - wait; 
      }
    }
    return wait
  }

  const withAnimatedChildren = (props) => {
    const constructAnimCss = (offset) => {
      const css = {
        animation: animateOptions.animation,
        infinite: animateOptions.infinite,
        delay: computeTime( 
          offset,
          animateOptions.dampingDelay,
          animateOptions.delay
        ),
        speed: computeTime(
          offset,
          animateOptions.dampingSpeed || 0,
          animateOptions.speed
        ),
        wait: animateOptions.loop ? calculateTotalWait(props) : animateOptions.wait,
        loop: animateOptions.loop
      }
      Object.keys(css).forEach((key) => css[key] === undefined && delete css[key])
      return css
    }
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
