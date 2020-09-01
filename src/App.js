import React, { useState } from 'react';
import { DatePicker } from "@material-ui/pickers";
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import './App.css';

const today = new Date();

const getNextBday = (selected, pow = 1) => {
  const sumDate = new Date(selected);
  sumDate.setDate(sumDate.getDate() + Math.pow(10, pow));
  if (sumDate >= today) {
    return {
      date: sumDate.toLocaleDateString(),
      pow
    }
  }
  return getNextBday(selected, pow + 1);
};

function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [firstTime, firstTimeChange] = useState(false);
  const mathBday = getNextBday(selectedDate);
  const handleDate = (date) => {
    handleDateChange(date);
    firstTimeChange(true);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <header className="App-header">
          <Paper style={{padding: 40}}>
            <Typography variant="h5" style={{marginBottom: 30}}>
              Math birthday
            </Typography>
            <DatePicker
              disableFuture
              openTo="year"
              format="dd/MM/yyyy"
              label="Date of birth"
              views={["year", "month", "date"]}
              value={selectedDate}
              onChange={handleDate}
            />
            {firstTime && (
              <Typography variant="h6" style={{marginTop: 30}}>
                {`Your next math birthday is your ${mathBday.pow}-day-old birthday on ${mathBday.date}`}
              </Typography>
            )}
          </Paper>
        </header>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
