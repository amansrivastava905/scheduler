import React, {useState, useEffect} from 'react'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import './App.css'
import ErrorPage from './pages/errorPage';
import LandingPage from './pages/LandingPage';
import AttendancePage from './pages/AttendancePage';
import { BottomNav, TopBar } from './components/NavigationComponent';
import SignupPage from './pages/SignupPage'
import { makeStyles } from '@material-ui/core/styles';
import AccountPage from './pages/AccountPage';
import {auth, createUserProfileDocument} from './firebase.js'

const useStyles = makeStyles({
  container: {
      overflow:'hidden'
  }
});



const App = () => {

  const [user, setUser] = useState(null)

  useEffect (() => {
    auth.onAuthStateChanged(async user => {
      createUserProfileDocument(user)
      await setUser(user)
    })
    }, [])

  console.log(user)
  console.log(auth.X)

  const classes = useStyles();

  return (
    <div className={classes.container}>
    {
      (user !== null) ? (
        <HashRouter>
        <TopBar />
        <BottomNav />
        <Switch>
          <Route path="/attendance" exact component={AttendancePage} />
          <Route path="/schedule" exact component={ErrorPage} />
          <Route path="/account" exact component={AccountPage} />
          <Route path="*" render={() => <Redirect to='/attendance' />} />
        </Switch>
      </HashRouter>
        )
      : 
      (
        <HashRouter>
        <TopBar />
        <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="*" render={() => <Redirect to='/' />} />
        </Switch>
        </HashRouter>
      )

    }
      
    </div>
  )
}

export default App

