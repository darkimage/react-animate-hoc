import React from 'react'
import { withAnimated } from 'react-animate-hoc'
import 'animate.css'
import { Head } from './typography-inject'
import styled from 'styled-components'
import Prism from 'prismjs'
import '../node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import './prism.css'

const BounceIn = withAnimated(
  function (props) {
    return (
      <div {...props}> 
        I'm a Bouncing div
      </div>)
  },
  {
    animation: 'bounceIn',
    infinite: true
  }
)

const Code = function (props) {
  const code = <code className={props.language ? props.language :'language-javascript'}>{`${props.code}`}</code>;
  return !props.noPre ? <pre className="NormalizeWhitespace">{code}</pre> : code
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
const testCode = `
// Simple component that render a div 
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
);`

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
				<Code code={testCode}/>
        <strong>Result:</strong><BounceIn className="animateContainer" />
        <h2>Styled Components, why not 🤩</h2>
			</div>
    </AppContainer>
  )
} 

export default App
