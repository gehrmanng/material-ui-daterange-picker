import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

// Local lib imports
import Picker from '../lib';

class ExampleApp extends Component {
  state = {
    date: moment('2018-11-19'),
  };

  handleChange = (newValue) => {
    this.setState({
      date: newValue,
    });
  };

  render() {
    const { date } = this.state;

    let textValue;
    if (moment.isRange(date)) {
      textValue = `${date.start.format('L')} \u2014 ${date.end.format('L')}`;
    } else {
      textValue = date.format('L');
    }

    return (
      <div style={{ width: '80%', margin: '0 auto' }}>
        <CssBaseline />
        <h1>Material-UI date range picker</h1>
        <Picker
          autoSubmit={false}
          value={date}
          onChange={this.handleChange}
          variant="range-picker"
        />
        <br />
        <Typography>{textValue}</Typography>
      </div>
    );
  }
}

export default ExampleApp;
