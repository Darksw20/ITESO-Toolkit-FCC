import React, { useState } from 'react';
import PropTypes from "prop-types";
import {
  Container, makeStyles, Paper, TextField, IconButton, ThemeProvider, createMuiTheme, Box,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from "@material-ui/core/Typography";
import { Send } from '@material-ui/icons';
import './App.css';
import { teal } from '@material-ui/core/colors';
import useDiagram from './useDiagram';
import relations from './back/relations';
//import combination from './back/permutation';
//import permutation from './back/combination';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

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
  }, root: {
    flexGrow: 1
    //backgroundColor: theme.palette.background.paper,
  }
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

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [text, setText] = useState('')
  let rel = relations({
    relation: text,
  })
  /*
  let comb = combination({
    Poblation: "8",
    Sample: "3"
  })
  let per = permutation({
    Poblation: "8",
    Sample: "3"
  })
  */
  const graph = useDiagram({ entitys: rel.entitys, relations: rel.relations });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered
          aria-label="simple tabs example"
        >
          <Tab label="Relaciones" {...a11yProps(0)} />
          <Tab label="Sucesiones" {...a11yProps(1)} />
          <Tab label="Permutaciones" {...a11yProps(2)} />
          <Tab label="Combianciones" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ThemeProvider theme={theme}>
          <Container className={classes.container}>
            <Paper className={classes.paper} elevation={5}>
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
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
          <Container className={classes.container}>
            <Paper className={classes.paper} >
              <h3 style={{ color: 'white' }}>Reflexividad: {rel.hasReflexivity}</h3>
              <h3 style={{ color: 'white' }}>Simetria: {rel.hasSimetry}</h3>
              <h3 style={{ color: 'white' }}>Transitividad: {rel.hasTransitivity}</h3>
              <h3 style={{ color: 'white' }}>Es una función: {rel.isFunction}</h3>
              <h3 style={{ color: 'white' }}>Dominio X=[ {rel.domain + ','} ]</h3>
              <h3 style={{ color: 'white' }}>Codominio Y=[ {rel.codomain + ','}]</h3>

            </Paper>
          </Container>
        </ThemeProvider>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ThemeProvider theme={theme}>
          <Container className={classes.container}>
            <Paper className={classes.paper} elevation={5}>
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
                InputProps={{ startAdornment: 'Límite inferior: ' }}
              />
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
                InputProps={{ startAdornment: 'Límite superior: ' }}
              />
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
                InputProps={{ startAdornment: 'Formula explicita: ' }}
              />
              <br />
              <Box style={{ width: '100%', height: 300 }} ref={graph} />
            </Paper>

          </Container>

        </ThemeProvider>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ThemeProvider theme={theme}>
          <Container className={classes.container}>
            <Paper className={classes.paper} elevation={5}>
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
                InputProps={{ startAdornment: 'N: ' }}
              />
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
                InputProps={{ startAdornment: 'R: ' }}
              />
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
                InputProps={{ startAdornment: 'Palabras: ' }}
              />
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
                InputProps={{ startAdornment: 'Letras: ' }}
              />
              <br />
              <Box style={{ width: '100%', height: 300 }} ref={graph} />
            </Paper>

          </Container>

        </ThemeProvider>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ThemeProvider theme={theme}>
          <Container className={classes.container}>
            <Paper className={classes.paper} elevation={5}>
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
                InputProps={{ startAdornment: 'N: ' }}
              />
              <TextField
                fullWidth
                onChange={e => setText(e.target.value)}
                InputProps={{ startAdornment: 'R: ' }}
              />
              <Box style={{ width: '100%', height: 300 }} ref={graph} />
            </Paper>

          </Container>

        </ThemeProvider>
      </TabPanel>
    </div>

  );
}

export default App;