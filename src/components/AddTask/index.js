import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import database from '../../firebase';
import firebase from 'firebase';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    container: {
        margin: "20px auto",
        padding: '10px'
    },
    form: {
        display: 'flex',
        justifyContent: 'center'
    },
    textfield: {
        width: '500px'
    },
    iconButton: {
        margin: '5px',
    },
    snackbar: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}))


const AddTask = () => {

    const classes = useStyles();

    // snackbar functionality
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackSeverity, setSnackSeverity] = useState("success");
    const [snackMessage, setSnackMessage] = useState("");
    const handleSnackOpen = (severity, message) => {
        setSnackSeverity(severity);
        setSnackMessage(message);
        setSnackOpen(true);
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };

    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setValue('');
                if (value !== '') {
                    database.ref(`users/${user.uid}/schedule`).push({
                        task: value
                    }).then(() => {
                        handleSnackOpen("success", "task added");
                        setValue('');
                    })
                }
                else {
                    handleSnackOpen("error", "task content is empty");
                }
            } else return null
        })
    }

    return (
        <div className={classes.container}>
            <form className={classes.form}>
                <TextField size='medium' variant='outlined' type='string' placeholder='Will complete module 5' label='your task?' className={classes.textfield} value={value} onChange={handleChange} />
                <IconButton aria-label="save" className={classes.iconButton} onClick={handleSubmit} type='submit'>
                    <AddCircleOutlineIcon />
                </IconButton>
            </form>
            <div className={classes.snackbar}>
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity={snackSeverity}>
                        {snackMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default AddTask
