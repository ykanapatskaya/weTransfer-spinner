import 'static/global.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'views/App';

const target = document.getElementById('root');

if (target) {
  ReactDOM.render(<App />, target);
}
