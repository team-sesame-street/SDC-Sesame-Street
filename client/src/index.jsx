import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
// eslint-disable-next-line import/extensions
import App from './components/App.jsx';

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
html, body {
  font-family: 'Lora';
  font-weight: 400;
  height: 100%;
}
body {
  line-height: calc(1em + 0.5rem);
  -webkit-font-smoothing: antialiased;
  /* background-image: radial-gradient(#f5ebe0 2px, transparent 2px);
background-size: 100px 100px; */
/* background-color: #EDEDE9; */
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  font-family: 'Lora';
  font-family: 600;
}
#root, #__next {
  isolation: isolate;
}
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('app'),
);
