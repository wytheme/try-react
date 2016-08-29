import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  // wrong!
  // <App count="1"/>,
  // right!
  // <App count={1}/>,
  <App/>,
  document.getElementById('app')
)
