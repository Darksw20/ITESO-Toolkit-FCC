import React, { useState } from 'react';
import {
  Container, makeStyles, Paper, TextField, IconButton, ThemeProvider, createMuiTheme, Box,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import './App.css';
import { teal } from '@material-ui/core/colors';
import useDiagram from './useDiagram';
import determ from './determ';

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
  let api = determ({
    relation: '(1,0),(0,1),(0,3),(1,0),(1,1),(2,2),(3,0),(3,3)',
  })
  const graph = useDiagram({ entitys: api.entitys, relations: api.relations });
  
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