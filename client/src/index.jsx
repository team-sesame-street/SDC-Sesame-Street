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
}
body {
  line-height: calc(1em + 0.5rem);
  -webkit-font-smoothing: antialiased;
  background-color: #EDEDE9;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 60'%3E%3Cg %3E%3Crect fill='%23EDEDE9' width='11' height='11'/%3E%3Crect fill='%23edede9' x='10' width='11' height='11'/%3E%3Crect fill='%23eeeeea' y='10' width='11' height='11'/%3E%3Crect fill='%23eeeeea' x='20' width='11' height='11'/%3E%3Crect fill='%23eeeeea' x='10' y='10' width='11' height='11'/%3E%3Crect fill='%23efefeb' y='20' width='11' height='11'/%3E%3Crect fill='%23efefeb' x='30' width='11' height='11'/%3E%3Crect fill='%23efefec' x='20' y='10' width='11' height='11'/%3E%3Crect fill='%23efefec' x='10' y='20' width='11' height='11'/%3E%3Crect fill='%23f0f0ec' y='30' width='11' height='11'/%3E%3Crect fill='%23f0f0ed' x='40' width='11' height='11'/%3E%3Crect fill='%23f0f0ed' x='30' y='10' width='11' height='11'/%3E%3Crect fill='%23f1f1ed' x='20' y='20' width='11' height='11'/%3E%3Crect fill='%23f1f1ee' x='10' y='30' width='11' height='11'/%3E%3Crect fill='%23f1f1ee' y='40' width='11' height='11'/%3E%3Crect fill='%23f2f2ef' x='50' width='11' height='11'/%3E%3Crect fill='%23f2f2ef' x='40' y='10' width='11' height='11'/%3E%3Crect fill='%23f2f2ef' x='30' y='20' width='11' height='11'/%3E%3Crect fill='%23f2f2f0' x='20' y='30' width='11' height='11'/%3E%3Crect fill='%23f3f3f0' x='10' y='40' width='11' height='11'/%3E%3Crect fill='%23f3f3f0' y='50' width='11' height='11'/%3E%3Crect fill='%23f3f3f1' x='60' width='11' height='11'/%3E%3Crect fill='%23f4f4f1' x='50' y='10' width='11' height='11'/%3E%3Crect fill='%23f4f4f2' x='40' y='20' width='11' height='11'/%3E%3Crect fill='%23f4f4f2' x='30' y='30' width='11' height='11'/%3E%3Crect fill='%23f5f5f2' x='20' y='40' width='11' height='11'/%3E%3Crect fill='%23f5f5f3' x='10' y='50' width='11' height='11'/%3E%3Crect fill='%23f5f5f3' x='70' width='11' height='11'/%3E%3Crect fill='%23f6f6f3' x='60' y='10' width='11' height='11'/%3E%3Crect fill='%23f6f6f4' x='50' y='20' width='11' height='11'/%3E%3Crect fill='%23f6f6f4' x='40' y='30' width='11' height='11'/%3E%3Crect fill='%23f6f6f5' x='30' y='40' width='11' height='11'/%3E%3Crect fill='%23f7f7f5' x='20' y='50' width='11' height='11'/%3E%3Crect fill='%23f7f7f5' x='80' width='11' height='11'/%3E%3Crect fill='%23f7f7f6' x='70' y='10' width='11' height='11'/%3E%3Crect fill='%23f8f8f6' x='60' y='20' width='11' height='11'/%3E%3Crect fill='%23f8f8f6' x='50' y='30' width='11' height='11'/%3E%3Crect fill='%23f8f8f7' x='40' y='40' width='11' height='11'/%3E%3Crect fill='%23f9f9f7' x='30' y='50' width='11' height='11'/%3E%3Crect fill='%23f9f9f8' x='90' width='11' height='11'/%3E%3Crect fill='%23f9f9f8' x='80' y='10' width='11' height='11'/%3E%3Crect fill='%23f9f9f8' x='70' y='20' width='11' height='11'/%3E%3Crect fill='%23fafaf9' x='60' y='30' width='11' height='11'/%3E%3Crect fill='%23fafaf9' x='50' y='40' width='11' height='11'/%3E%3Crect fill='%23fafaf9' x='40' y='50' width='11' height='11'/%3E%3Crect fill='%23fbfbfa' x='90' y='10' width='11' height='11'/%3E%3Crect fill='%23fbfbfa' x='80' y='20' width='11' height='11'/%3E%3Crect fill='%23fbfbfa' x='70' y='30' width='11' height='11'/%3E%3Crect fill='%23fcfcfb' x='60' y='40' width='11' height='11'/%3E%3Crect fill='%23fcfcfb' x='50' y='50' width='11' height='11'/%3E%3Crect fill='%23fcfcfc' x='90' y='20' width='11' height='11'/%3E%3Crect fill='%23fdfdfc' x='80' y='30' width='11' height='11'/%3E%3Crect fill='%23fdfdfc' x='70' y='40' width='11' height='11'/%3E%3Crect fill='%23fdfdfd' x='60' y='50' width='11' height='11'/%3E%3Crect fill='%23fdfdfd' x='90' y='30' width='11' height='11'/%3E%3Crect fill='%23fefefd' x='80' y='40' width='11' height='11'/%3E%3Crect fill='%23fefefe' x='70' y='50' width='11' height='11'/%3E%3Crect fill='%23fefefe' x='90' y='40' width='11' height='11'/%3E%3Crect fill='%23ffffff' x='80' y='50' width='11' height='11'/%3E%3Crect fill='%23FFFFFF' x='90' y='50' width='11' height='11'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
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
