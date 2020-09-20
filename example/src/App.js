import React, { useState } from 'react'
import { withAnimated, withAnimatedGroup} from 'react-animate-hoc'
import 'animate.css'
import { Head } from './typography-inject'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism.css'
import Table from 'rc-table'
import { ReactComponent as SocialBg } from './social_bg.svg'
import { ReactComponent as SeeOnGithub } from './see_it_on_github.svg'
import { ReactComponent as GithubMark } from './github_mark.svg'

// Example components

const div = ({ hover, ...props }) => {
  return (<div {...props}/>)
}

const AnimateDivChild = withAnimated(div);

const BounceIn = withAnimated(div,{
    animation: 'bounceIn',
    infinite: true
  }
)

const MultipleAnim = withAnimated(div, {
  animation: ['bounce', 'flash'],
  infinite: true
})

const StyledDiv = withAnimated(styled.div`
  background: linear-gradient(to right, orange , yellow, green, cyan, blue, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`, {
  animation: 'tada',
  infinite: true
})

const Emoji = function (props) {
  return <span>{props.emoji}</span>
};

const SwingInjsx = withAnimated(div);

const HoverDiv = withAnimated(div, {
  animation: (props) => {
    if (props.hover) {
      return 'bounceIn'
    } else {
      return 'bounceOut'
    }
  }
})

const HoverDivWrap = function (props) {
  const [hover, setHover] = useState();
  return <div className="hoverContainer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
    <HoverDiv hover={hover} {...props}/>
  </div>
}

const AnimatedGroup = withAnimatedGroup(function (props) {
  return <div {...props}/> 
}, {
  animation: 'flipInX',
  dampingDelay: 0.2,
  speed: 2,
  dampingSpeed: 0.5,
  loop: true
})

const MultipleAnimChild = withAnimated(div);

const MultipleAnimGroup = withAnimatedGroup(div, {
  animation: ['fadeInLeft', 'fadeOutRight'],
  loop: true,
  delay: [0, 2],
  speed: [0.8, 1],
  dampingDelay: 0.2,
  opacity: 0,
  fillMode: ['forwards', 'forwards'],
})

// Page contstruction components
const SocialIcon = styled(function (props) {
  return <div  {...props}>
    <SocialBg className="bg"/>
    {props.children}
  </div>
})`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -75px;
  right: -75px;
  width: 200px;
  height: 200px;

  @media only screen and (max-width: 425px){
    transform: scale(0.6);
    top: -85px;
    right: -85px;
  }

  @media only screen and (max-width: 768px){
    transform: scale(0.8);
    top: -75px;
    right: -75px;
  }

  & > .logo {
    position: absolute;
    right: 78px;
    top: 79px;
    width: 70px;
    height: 70px;

    & path {
      fill: #fff
    }
  }

  & > .bg {
    position: absolute;
    z-index: -1;
    animation: rotate 60s linear infinite;
    & path {
      fill: #4078c0;
    }
  }

  & > .text {
    position: absolute;
    top: 76px;
    right: -4px;
    transform: scale(0.8);
    fill: #fff;
  }

`;

const BetaBanner = withAnimated(
  styled.div`
    opacity: 0;
    & > * {
      margin: 0.2rem;
      color: #69c6f3;
    }
  `, {
  delay: [0, 2],
  speed: [1, 1],
  animation: ['fadeInLeft', 'fadeOutRight'],
  loop: true,
  wait: 3,
  fillMode: ['forwards', 'forwards'],
});

const BetaBannerContainer = styled.div`
  position: absolute;
  top: 41px;
  left: -141px;
  transform: rotate(-45deg);
  border: 5px solid;
  border-color: #c9e3ff;
  min-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px){
    top: 21px;
    left: -161px;
  }

  @media only screen and (max-width: 425px){
    top: 11px;
    left: -171px;
    font-size: medium;
    border-width: 2px;
  }
`;

const Code = function (props) {
  const { className, ...rest } = props
  var style = rest;
  if (props.noPre) { style = {}}
  const code = <code className={`${className ? className : ''} ${props.language ? props.language : 'language-jsx'}`} {...style}>{`${props.code}`}</code>;
  return !props.noPre ? <pre className="NormalizeWhitespace" {...style}>{code}</pre> : code
}

const AppContainer = withAnimated(styled.div`
  padding: 5% 25%;
  overflow: hidden;
  position: relative;
  @media only screen and (max-width: 768px){
    padding: 5% 15%;
  }
  @media only screen and (max-width: 425px){
    padding: 5% 8%;
  }
`, {
  animation: "fadeIn",
  animationDuration: "2s"
});


//Code Examples

const codeWithAnimated = 'withAnimated()';
const codeWithAnimatedGroup = 'withAnimatedGroup()';
const exampleCode = `// Simple component that render a div 
// (style and className are necessary for the library to work)
const div = function (props) {
  return (
    <div {...props}> 
      I'm a Bouncing div
    </div>
  )
};

//Lets add some animation to it 🥰
const BouncingDiv = withAnimated(div,{
    animation: 'bounceIn',
    infinite: true
  }
);`;

const propsExampleCode = `import { render } from 'react-dom'

'const SwingingDiv = withAnimated(function (props) {
  return (
    <div {...props}> 
      I'm a Swinging div
    </div>
  )
});

render (
  <SwingingDiv animatecss={{animation: "swing", infinite: true}}/>,
  document.getElementById('root')
)`;

const styledExampleCode = `const StyledDiv = withAnimated(styled.div\`
  background: linear-gradient(to right, orange , yellow, green, cyan, blue, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
\`, {
  animation: 'tada',
  infinite: true
})`;

const multipleExampleCode = `const MultipleAnim = withAnimated((props) => {
  return <div {...props}/>
}, {
  animation: ['bounce', 'flash'],
  infinite: true
})`;

const customCssExampleCode = `withAnimated(div,{
  animation: 'bounce', //normal library property
  animationDelay: '6s' //css property that will get injected in the component style
})`;

const functionExampleCode = `const AnimatedDiv = withAnimated(div, {
  animation: (props) => {
    if (props.hover) {
      return 'bounceIn'
    } else {
      return 'bounceOut'
    }
  }
});

const HoverDiv = function (props) {
  const [hover, setHover] = useState();
  return <div className="hoverContainer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
    <AnimatedDiv hover={hover} {...props}/>
  </div>
}`;

const groupExampleCode = `import { render } from 'react-dom'

//This is the animation group container
const AnimatedGroup = withAnimatedGroup(function (props) {
  return <div {...props}/>
}, {
  animation: 'flipInX', //the animation to play on each child (if not specified each child will play its own)
  dampingDelay: 0.2, // controls how to scale the delay for each child
  speed: 2, 
  dampingSpeed: 0.5, // controls how to speed down (postive values) or speed up (negative values) the child animations
  loop: true //automatically calculate the wait property for each child creating a seamless loop (experimental)
})

render(
  <AnimatedGroup>
    <AnimChild>I'm a flipping div</AnimChild>
    <AnimChild>I'm a flipping div</AnimChild>
    <AnimChild>I'm a flipping div</AnimChild>
    <AnimChild>I'm a flipping div</AnimChild>
  </AnimatedGroup>,
  document.getElementById('root')
)`;

const groupMultipleAnimExampleCode = `import { render } from 'react-dom'

const MultipleAnimChild = withAnimated(div);

const MultipleAnimGroup = withAnimatedGroup(div, {
  animation: ['fadeInLeft', 'fadeOutRight'],
  loop: true,
  delay: [0, 2],
  speed: [0.8, 1],
  dampingDelay: 0.2, //can be an also an array
  opacity: 0, //used to set the initial state as not visible since the animations we are using control the opacity
  fillMode: ['forwards', 'forwards'], // see https://www.w3schools.com/cssref/css3_pr_animation-fill-mode.asp 
});

render(
  <AnimatedGroup>
    <AnimChild>I'm a flipping div</AnimChild>
    <AnimChild>I'm a flipping div</AnimChild>
    <AnimChild>I'm a flipping div</AnimChild>
    <AnimChild>I'm a flipping div</AnimChild>
  </AnimatedGroup>,
  document.getElementById('root')
)`;


const columns = [
  {
    title: 'Key',
    dataIndex: 'prop',
    key: 'prop',
    width: 200,
    render: (value) => <Code code={value} />,
  },
  {
    title: 'Data Type',
    dataIndex: 'data',
    key: 'data',
    width: 200,
    render: (value) => {
      const codes = [];
      for (const [i,code] of value.split(/\s/).entries()) {
        codes.push(<Code key={`code-${i}`} style={{margin: '0.1rem'}} code={code} />)
      }
      return (<div style={{ display: 'flex', flexWrap: 'wrap'}}>{codes}</div>)
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 200,
    render: (value) => <div>{value}</div>,
  },
];

const data = [
  {
    prop: 'animation:',
    data: 'string Array<string> Function',
    description: [<span key='d1-0'>Animation keybindings name, you can see all the animation names in the official </span>, <a key="d1-1" href="https://animate.style/">Animate.css</a>, <span key='d1-2'> website. If an array is specified multiple animation are added using the </span>, <strong key="d1-3">animation-name</strong>, <span key='d1-4'> css property</span>],
    key: '1'
  },
  {
    prop: 'speed:',
    data: 'Number string Array<string> Array<Number> Function',
    description: <span>The duration (length) of the animation, if in animate.css doesn't exist a class with the duration specified by this property then the <strong>animation-duration</strong> property is injected directly in the style of the wrapped element</span>,
    key: '2'
  },
  {
    prop: 'delay:',
    data: 'Number string Array<string> Array<Number> Function',
    description: 'The time to wait before starting to play the animation',
    key: '3'
  },
  {
    prop: 'wait:',
    data: 'Number',
    description: <span>The time in seconds to wait between repeats of the animation <strong>(Implemented through JS, since it's currently not possible with pure CSS)</strong></span>,
    key: '4'
  },
  {
    prop: 'fillMode:',
    data: 'string Array<string>',
    description: 'Shorthand for animationFillMode (animation-fill-mode)',
    key: '5'
  },
  {
    prop: 'infinite:',
    data: 'boolean',
    description: <span>Set the animation to infinite reapeats, if <strong>wait</strong> is also specified the aniation is restarted after the specified time</span>,
    key: '6'
  }
];

const App = () => {
  return (
    <AppContainer>
      <SocialIcon>
        <SeeOnGithub className="text" />
        <GithubMark className="logo"/>
      </SocialIcon>
      <BetaBannerContainer>
        <BetaBanner><h4>BETA</h4></BetaBanner>
      </BetaBannerContainer>
      <Head>
        <title>React Animate HOC</title>
      </Head>
      <h1>React Animate <a href="https://reactjs.org/docs/higher-order-components.html">HOC</a></h1>
      <p>This React library is designed to leverage the awesome <a href="https://animate.style/">animate.css</a> with little work, simply by wrapping your components using either <Code noPre code={codeWithAnimated} /> or <Code noPre code={codeWithAnimatedGroup}/></p>
      <div className="examples">
        <h2>Basic Example</h2>
        <Code code={exampleCode}/>
        <strong>Result:</strong>
        <BounceIn className="animateContainer">I'm a Bouncing div</BounceIn>
        <h4>Using props is JSX</h4>
        <p>you can also use it by specify the <Code noPre code="animatecss" /> property directly in JSX</p>
        <Code code={propsExampleCode} />
        <strong>Result:</strong>
        <SwingInjsx className="animateContainer" animatecss={{ animation: "swing", infinite: true }} >I'm a Swinging div</SwingInjsx>
        <h2>Styled Components, why not <Emoji emoji="🤩"/></h2>
        <p>There are no issue using <a href="https://styled-components.com/">Styled Components</a> with the library, they just work and are pretty fancy</p>
        <Code code={styledExampleCode} />
        <strong>Result:</strong>
        <StyledDiv className="animateContainer">I'm a Fancy styled div</StyledDiv>
        <h2>Using multiple animations <Emoji emoji="🤯" /></h2>
        <p>You can mix all the animations you want by simply put them in an array in the <Code noPre code="animation"/> proprety</p>
        <Code code={multipleExampleCode} />
        <strong>Result:</strong>
        <MultipleAnim className="animateContainer">Multiple animations!!</MultipleAnim>
        <h2>Animate.css properties list</h2>
        <p>This is the complete list of supported options from Animate.css that you can supply to the hoc functions, remember that you can specify additional css properties by writing them in camel case.</p>
        <p>You can also assign to each of this property a function, the parameters passed to the function are:</p> <Code code="(props, animateCssVariables) => {}"/> <p><strong>animateCssVariables</strong> contains an object with all the default css variables values of animate.css.</p>
        <Code code={customCssExampleCode}/>
        <Table style={{ overflowX: "auto" }} tableLayout="fixed" columns={columns} data={data} />
        <h2>Using <Code noPre code="withAnimatedGroup()" /> <Emoji emoji="🤔" /></h2>
        <p>This hoc share the same properties of <Code noPre code="withAnimated()" /> but as well introduces some other properties to better control the animation flow of a group <strong>withAnimated</strong> children</p>
        <p>Here's a simple example showing how to use some of this newly introduced properties to create a looped cascaded animation:</p>
        <Code code={groupExampleCode}></Code>
        <strong>Result:</strong>
        <AnimatedGroup className="animateGroup">
          <AnimateDivChild className="animateContainer">I'm a flipping div</AnimateDivChild>
          <AnimateDivChild className="animateContainer">I'm a flipping div</AnimateDivChild>
          <AnimateDivChild className="animateContainer">I'm a flipping div</AnimateDivChild>
          <AnimateDivChild className="animateContainer">I'm a flipping div</AnimateDivChild>
        </AnimatedGroup>
        <h4>Working with multiple animation</h4>
        <p><Code noPre code="withAnimatedGroup()" /> works also with multiple animation, you have to just specify the correct array for the properties you are interested, and if you are using <Code noPre code="loop: true" /> the  <strong>wait property</strong> is calculated automatically for each child taking into account all the <strong>animation,duration and delays</strong>:</p>
        <Code code={groupMultipleAnimExampleCode} />
        <strong>Result:</strong>
        <MultipleAnimGroup className="animateGroup">
          <MultipleAnimChild className="animateContainer">Multiple Animations</MultipleAnimChild>
          <MultipleAnimChild className="animateContainer">Multiple Animations</MultipleAnimChild>
          <MultipleAnimChild className="animateContainer">Multiple Animations</MultipleAnimChild>
        </MultipleAnimGroup>
        <h2>Advanced usage <Emoji emoji="🤓" /></h2>
        <p>Every property of the hoc can be set using a <strong>function</strong> here's a simple example showing how to set an animation using <Code noPre code="onMouseEnter" /> and <Code noPre code="onMouseLeave" /></p>
        <Code code={functionExampleCode} />
        <strong>Result:</strong>
        <HoverDivWrap className="animateContainer">I bounce on Hover</HoverDivWrap>
      </div>
  </AppContainer>
  )
} 

export default App
