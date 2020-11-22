import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom';
import './App.css'
import ErrorPage from './pages/errorPage';
import LandingPage from './pages/LandingPage';
import AttendancePage from './pages/AttendancePage';
import { BottomNav, TopBar } from './components/NavigationComponent';
import SignupPage from './pages/SignupPage'
import { makeStyles } from '@material-ui/core/styles';
import AccountPage from './pages/AccountPage';


const useStyles = makeStyles({
  container: {
      overflow:'hidden'
  }
});


const App = () => {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <HashRouter>
        <TopBar />
        <BottomNav />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/attendance" exact component={AttendancePage} />
          <Route path="/schedule" exact component={ErrorPage} />
          <Route path="/account" exact component={AccountPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App


