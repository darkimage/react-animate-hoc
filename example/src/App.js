import React, { useState } from 'react'
import { withAnimated} from 'react-animate-hoc'
import 'animate.css'
import { Head } from './typography-inject'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism.css'
import Table from 'rc-table';

const div = (props) => {
  return (
    <div {...props}> 
      {props.children}
    </div>)
}

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
    <HoverDiv hover={hover} {...props}>{props.children}</HoverDiv>
  </div>
}

const Code = function (props) {
  const { className, ...rest } = props
  var style = rest;
  if (props.noPre) { style = {}}
  const code = <code className={`${className ? className : ''} ${props.language ? props.language : 'language-jsx'}`} {...style}>{`${props.code}`}</code>;
  return !props.noPre ? <pre className="NormalizeWhitespace" {...style}>{code}</pre> : code
}

const AppContainer = withAnimated(styled.div`
  margin: 5% 25%;
  @media only screen and (max-width: 768px){
    margin: 5% 15%;
  }
  @media only screen and (max-width: 425px){
    margin: 5% 8%;
  }
`, {
  animation: "fadeIn",
  animationDuration: "2s"
});

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
})`

const multipleExampleCode = `const MultipleAnim = withAnimated((props) => {
  return (<div {...props}>{props.children}</div>)
}, {
  animation: ['bounce', 'flash'],
  infinite: true
})`

const customCssExampleCode = `withAnimated(div,{
  animation: 'bounce', //normal library property
  aniamtionDelay: '6s' //css property that will get injected in the component style
})`

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
    <AnimatedDiv hover={hover} {...props}>{props.children}</AnimatedDiv>
  </div>
}`

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
    description: [<span key='d1-0'>Animation keybindings name, you can see all the animation names in the official </span>, <a key="d1-1" href="https://animate.style/">Animate.css</a>, <span key='d1-2'> website. If an array is specified multiple animation are added using the </span>, <strong key="d1-3">animation-name</strong>,<span key='d1-4'> css property</span>],
    key: '1'
  },
  {
    prop: 'duration:',
    data: 'int string Array<string> Array<int> Function',
    description: <span>The duration (length) of the animation, if in animate.css doesn't exist a class with the duration specified by this property then the <strong>animation-duration</strong> property is injected directly in the style of the wrapped element</span>,
    key: '2'
  },
];

const App = () => {
  return (
    <AppContainer>
      <Head>
        <title>React Animate HOC</title>
      </Head>
      <h1>React Animate <a href="https://reactjs.org/docs/higher-order-components.html">HOC</a></h1>
      <p>
        This React library is designed to leverage the awesome <a href="https://animate.style/">animate.css</a> with little work, simply by wrapping your components using either <Code noPre code={codeWithAnimated} /> or <Code noPre code={codeWithAnimatedGroup}/>
      </p>
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
        <h2>Using <Code noPre code="withAnimatedGroup()"/> <Emoji emoji="🤔" /></h2>
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
