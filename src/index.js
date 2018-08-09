import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Records from './components/Records';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<Records />, document.getElementById('root'));
registerServiceWorker();
