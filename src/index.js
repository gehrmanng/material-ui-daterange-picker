import React from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import moment from 'moment';
import 'moment/locale/de';

import Picker from './lib';

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

render(<App />, document.getElementById('root'));
