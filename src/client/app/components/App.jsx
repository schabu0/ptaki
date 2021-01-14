import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core';
import Home from './Home';
import AddBird from './AddBird';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import EditBird from './EditBird';
import Bird from './Bird';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function App() {
  const [birds, setBirds] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isBackButton, setIsBackButton] = useState(false);

  const classes = useStyles();

  const addBird = async function (bird) {
    try {

      await fetch('/api/birds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bird)
      });
      fetchBirds()
        .then((response) => {
          console.log(response);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchBirds = async function () {
    setIsFetching(true);
    try {
      const res = await fetch('/api/birds');
      const b = await res.json();

      setIsFetching(false);
      setBirds(b);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onBirdRemove = (_id) => {
    const b = birds.filter((brd) => brd._id !== _id);

    setBirds(b);
  };
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {isBackButton && <Link to="/">
            <IconButton edge="start" className={classes.menuButton}
                        color="inherit" aria-label="menu">
              <ArrowBack/>
            </IconButton>
          </Link>}
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Ptaki</Link>
          </Typography>
          <Link to="/add">Dodaj</Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'md'}>
        <Switch>
          <Route path="/add">
            <AddBird setIsBackButton={setIsBackButton} onSubmit={addBird}/>
          </Route>
          <Route path="/bird/:id">
            <Bird setIsBackButton={setIsBackButton} onBirdRemove={onBirdRemove}/>
          </Route>
          <Route path="/edit/:birdId">
            <EditBird setIsBackButton={setIsBackButton}/>
          </Route>
          <Route path="/">
            <Home setIsBackButton={setIsBackButton} fetch={fetchBirds} birds={birds} onBirdRemove={onBirdRemove}/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

