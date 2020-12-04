import React,{useState, useEffect} from 'react';
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link as LinkR } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import { auth, signInWithGoogle, createUserProfileDocument} from '../../firebase.js';
import firebase from 'firebase'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  LinkR: {
    color: theme.palette.primary.main
  }
}));

export const SignIn = () => {

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [user,setUser]=useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = ()=>{
    signInWithGoogle();
  }

  useEffect(()=>{
    const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        setUser(true);
        setLoading(false);
      }
      else if(!user)
      {
        setUser(false);
        setLoading(false);
      }
    })
    return unsubscribe;
  },[])

  const handleEmail = event => {
    setEmail(event.target.value);
  }
  const handlePassword = event =>{
    setPassword(event.target.value);
  }

  const handleSubmit= async event => {
    event.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("")
      setPassword("")
    } catch(error) {
      console.log(error);
    }
  }



  return (
    (loading===false)
    ?(
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
                </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePassword}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
                    </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
                    </Button>
            <Grid container justify="center">
              {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
              <Grid item>
                <LinkR to="/Signup" variant="body2" className={classes.LinkR}>
                  {"Don't have an account? Sign Up"}
                </LinkR>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Slide>
    )
    :(<LoaderContainer><CircularProgress/></LoaderContainer>)
  );
}



const LoaderContainer = styled.div`
  width:100vw;
  min-height:50vh;
  display:flex;
  justify-content:center;
  align-items:center;
`







export const SignUp = () => {
  const classes = useStyles();

  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    if(password !== confirmPassword){
      alert("Passwords don't match");
      return
    }

    try {
      auth.createUserWithEmailAndPassword(email, password).then(auth.signOut());
      setDisplayName(null)
      setEmail("")
      setPassword("")

    } catch(error) {
      console.log(error);
    }
  }

  const handleDisplayName = event => {
    setDisplayName(event.target.value)
  }

  const handleEmail = event => {
    setEmail(event.target.value);
  }

  const handlePassword = event =>{
    setPassword(event.target.value);
  }

  const handleConfirmPassword = event => {
    setConfirmPassword(event.target.value);
  }



  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Display Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Display Name"
                  label="Display Name"
                  onChange={handleDisplayName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="Confirm Password"
                  onChange={handleConfirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick= {handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <LinkR to="/" variant="body2" className={classes.LinkR}>
                  Already have an account? Sign in
                </LinkR>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Slide>
  );
}
