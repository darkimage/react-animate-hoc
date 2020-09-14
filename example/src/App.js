import React from 'react'
import { withAnimated } from 'react-animate-hoc'
import 'animate.css'
import { Head } from './typography-inject'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism.css'

console.log(Prism)

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

const Code = function (props) {
  const code = <code className={props.language ? props.language :'language-jsx'}>{`${props.code}`}</code>;
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

const styledExampleCode = `import styled from 'styled-components'
import { render } from 'react-dom'

const StyledDiv = withAnimated(styled.div\`
  background: linear-gradient(to right, orange , yellow, green, cyan, blue, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
\`, {
  animation: 'tada',
  infinite: true
})

render(
  <StyledDiv>I'm a Fancy styled div</StyledDiv>,
  document.getElementById('root')
)`

const SwingInjsx = withAnimated(div);

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
        <h2>Using multiple animations <Emoji emoji="🤯"/></h2>
			</div>
    </AppContainer>
  )
} 

export default App
