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
      <div style={props.style} className={props.className}> 
        I'm a Bouncing div
      </div>)
  },
  {
    animation: 'bounceIn'
  }
)

const Code = function (props) {
  const code = <code className={props.language ? props.language :'language-javascript'}>{`${props.code}`}</code>;
  return !props.noPre ? <pre className="NormalizeWhitespace">{code}</pre> : code
}

const AppContainer = styled.div`
  margin: 5% 25%;
`;

const codeWithAnimated = 'withAnimated()';
const codeWithAnimatedGroup = 'withAnimatedGroup()';
const testCode = `
const AppContainer = styled.div\`
	margin: 5% 25%;
\`;
`

const App = () => {
  return (
    <AppContainer>
      <Head>
        <title>React Animate HOC</title>
      </Head>
      <h1>React Animate <a href="https://reactjs.org/docs/higher-order-components.html">HOC</a></h1>
      <p>
				This React library is designed to leverage the awesome <a href="https://animate.style/">animate.css</a> with little work, by simple wrapping your components using either <Code noPre code={codeWithAnimated} /> or <Code noPre code={codeWithAnimatedGroup}/>
			</p>
			<p className="examples">
				Prova Prova
				<Code code={testCode}/>
			</p>
      <BounceIn className="animateContainer"/>
    </AppContainer>
  )
} 

export default App
