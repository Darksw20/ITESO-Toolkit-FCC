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
import combination from './back/combination';
import permutation from './back/permutation';
import recursion from './back/recursion';

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
  const [relInp, setText] = useState('')
  let rel = relations({
    relation: relInp,
  });

  const [combInp1, setCombInp1] = useState('')
  const [combInp2, setCombInp2] = useState('')
  let comb = combination({
    Poblation: combInp1,
    Sample: combInp2
  });

  const [perInp1, setPerInp1] = useState('');
  const [perInp2, setPerInp2] = useState('');
  const [perInp3, setPerInp3] = useState('');

  let per = permutation({
    Poblation: perInp1,
    Sample: perInp2,
    Word: perInp3,
  })

  const [recInp1, setRecInp1] = useState('');
  const [recInp2, setRecInp2] = useState('');
  const [recInp3, setRecInp3] = useState('');

  let rec = recursion({
    inf: "1",
    sup: "5",
    form: "1/k^2"
  })
  console.log(rec)

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
          <Tab label="Combinaciones" {...a11yProps(3)} />
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
              <Box style={{ width: '100%', height: 300 }} >
                <h3 style={{ color: 'white' }}>Reflexividad: {rel.hasReflexivity}</h3>
                <h3 style={{ color: 'white' }}>Simetria: {rel.hasSimetry}</h3>
                <h3 style={{ color: 'white' }}>Transitividad: {rel.hasTransitivity}</h3>
                <h3 style={{ color: 'white' }}>Es una función: {rel.isFunction}</h3>
                <h3 style={{ color: 'white' }}>Dominio X=[ {rel.domain + ','} ]</h3>
                <h3 style={{ color: 'white' }}>Codominio Y=[ {rel.codomain + ','}]</h3>  
              </Box> 
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
                defaultValue="0"
                onChange={e => setRecInp1(e.target.value)}
                InputProps={{ startAdornment: 'Límite inferior: ' }}
              />
              <TextField
                fullWidth
                defaultValue="0"
                onChange={e => setRecInp2(e.target.value)}
                InputProps={{ startAdornment: 'Límite superior: ' }}
              />
              <TextField
                fullWidth
                defaultValue="0"
                onChange={e => setRecInp3(e.target.value)}
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
                min="1"
                defaultValue="1"
                onChange={e => setPerInp1(e.target.value)}
                InputProps={{ startAdornment: 'N: ' }}
              />
              <TextField
                fullWidth
                defaultValue="1"
                min="1"
                onChange={e => setPerInp2(e.target.value)}
                InputProps={{ startAdornment: 'R: ' }}
              />
              <TextField
                fullWidth
                onChange={e => setPerInp3(e.target.value)}
                InputProps={{ startAdornment: 'Palabras: ' }}
              />
              <br />
              <Box style={{ width: '100%' }}>
                <h3 style={{ color: 'white' }}>Con todos los elementos (r=n) : P(n,n) = {per.allElements.formula} = {per.allElements.res}</h3>
                <h3 style={{ color: 'white' }}>De un subconjunto r, (r=n): P(n,r)= n!/(n-r)! = {per.subElements.formula} = {per.subElements.res}</h3>
                <h3 style={{ color: 'white' }}>Permutaciones cíclicas para n: Pc=(n-1)! = {per.cyclic.formula} = {per.cyclic.res}</h3>
                <h3 style={{ color: 'white' }}>Permutaciones con elementos repetidos (r > n): Pr=n!/(n1!n2!...nk!) = {per.repeated.formula} = {per.repeated.res}</h3>  
                <h3 style={{ color: 'white' }}>Elementos repetidos:</h3>  
                
                { per.repeated.hash != undefined &&
                  
                    per.repeated.hash.map(({letter,times})=><div><h3 style={{ color: 'white' }}>La letra {letter} se repitio {times} veces</h3>  </div>)
                  
                }
              </Box>  
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
                defaultValue="0"
                onChange={e => setCombInp1(e.target.value)}
                InputProps={{ startAdornment: 'N: ' }}
              />
              <TextField
                fullWidth
                onChange={e => setCombInp2(e.target.value)}
                InputProps={{ startAdornment: 'R: ' }}
              />
              <Box style={{ width: '100%', height: 300 }} ref={graph} >
                <h3 style={{ color: 'white' }}>C(n,r) ↔ (n/r): {comb.case1.formula} = {comb.case1.res}</h3>
                <h3 style={{ color: 'white' }}>Para reducir el trabajo computacional: {comb.case2.formula} = {comb.case2.res}</h3>
                <h3 style={{ color: 'white' }}>Equivalente C(n,r) = C(n, n-r): {comb.case3.formula} = {comb.case3.formula2}</h3>
              </Box>
            </Paper>

          </Container>
        </ThemeProvider>
      </TabPanel>
    </div>

  );
}

export default App;