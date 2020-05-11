import React, { useState } from 'react';
import {
  Container, makeStyles, Paper, TextField, IconButton, ThemeProvider, createMuiTheme, Box,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import './App.css';
import { teal } from '@material-ui/core/colors';
import Axios from 'axios';
import useDiagram from './useDiagram';


const dummy = {
  hasReflexivity: true,
  hasSimetry: true,
  hasTransitivity: false,
  domain: [
    '0',
    '1',
    '2',
    '3',
  ],
  codomain: [
    '0',
    '1',
    '2',
    '3',
  ],
  isFunction: true,
  entitys: [
    { key: '0', color: 'lightblue' },
    { key: '1', color: 'orange' },
    { key: '2', color: 'lightgreen' },
    { key: '3', color: 'pink' },
  ],
  relations: [
    { from: '0', to: '0' },
    { from: '0', to: '1' },
    { from: '0', to: '3' },
    { from: '1', to: '0' },
    { from: '1', to: '1' },
    { from: '2', to: '2' },
    { from: '3', to: '0' },
    { from: '3', to: '3' },
  ],
  status: 200,
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    background: theme.palette.grey[700],
    minWidth: '50vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal.A100,
    },
    text: {
      primary: '#fff',
    },
  },
  shape: {
    borderRadius: 16,
  },
});


function App() {
  const classes = useStyles();
  const [status, setStatus] = useState({
    loadin: false,
    error: false,
    success: false,
  });
  const graph = useDiagram({ entitys: [], relations: [] });

  Axios({
    headers: {
      'Content-Type': 'application/json',
    },
    url: 'localhost:3001/webService/Determ',
    method: 'POST',
    data: {
      postParams: {
        relation: '(1,0),(0,1),(0,3),(1,0),(1,1),(2,2),(3,0),(3,3)',
      },
    },
  })
    .then((res) => {
      console.log(res);
    });

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        <Paper className={classes.paper} elevation={5}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: '{',
              endAdornment: (
                <>
                  {'}'}
                  <IconButton color="primary">
                    <Send />
                  </IconButton>
                </>
              ),
            }}
          />
          <br />
          <Box style={{ width: '100%', height: 300 }} ref={graph} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
