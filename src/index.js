// Library imports
import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import 'moment/locale/de';

import ExampleApp from './example/ExampleApp';

// Example application
const App = () => {
  moment.locale(window.navigator.language);

  return <ExampleApp />;
};

// Render the example application
render(<App />, document.getElementById('root'));
