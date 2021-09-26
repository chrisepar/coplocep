import React from 'react';
import ReactDOM from 'react-dom';

import Routing from "_routing.js";

// Opt-in to Webpack hot module replacement
// if (module.hot) module.hot.accept()

const root = document.createElement('app');
document.body.appendChild(root);

ReactDOM.render(<Routing />, root);