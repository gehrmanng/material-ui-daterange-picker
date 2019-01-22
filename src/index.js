// Library imports
import React from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import moment from 'moment';
import 'moment/locale/de';

// Local lib imports
import Picker from './lib';

// Example application
const App = () => {
  moment.locale(window.navigator.language);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <CssBaseline />
      <h1>Material UI DateRange Picker</h1>
      <Picker autoSubmit={false} />
    </div>
  );
};

// Render the example application
render(<App />, document.getElementById('root'));
