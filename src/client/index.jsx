import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../App.tsx';

window.addEventListener('load', () => {
	ReactDOM.render(<App />, document.getElementById('root'));
});
