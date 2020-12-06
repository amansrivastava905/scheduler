import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import database from '../firebase';
import firebase from 'firebase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Notebook from '../components/Notebook';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '80px',
        padding: '10px',

    },
    AddButton: {
        position: 'fixed',
        zIndex: '200',
        top: '75vh',
        left: '75vw'
    },
    loader:{
        display:'flex',
        justifyContent:'center'
    }
}));

const NotesPage = () => {

    const classes = useStyles();

    // add notebook
    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const [notebookName,setNotebookName]=useState('');
    const [notebookDesc, setNotebookDesc]=useState('');

    const handleNameChange = (e)=>{
        setNotebookName(e.target.value);
    }

    const handleDescChange=(e)=>{
        setNotebookDesc(e.target.value);
    }
    const handleAddNotebook = (e)=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setNotebookName('');
                setNotebookDesc('');
                if (notebookName !== '') {
                    database.ref(`users/${user.uid}/Notebooks`).push({
                        notebookName:notebookName,
                        notebookDesc:notebookDesc
                    }).then(() => { 
                        setNotebookName('');
                        setNotebookDesc('');
                    })
                }
                else {
                    
                }
            } else return null
        })
        handleClose();
    }

    // show notebooks
    const [Notebooks, setNotebooks] = useState([]);
    const [user, setUser] = useState(false);
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                database.ref(`users/${user.uid}/Notebooks`).on('value', (snapshot) => {
                    const array = [];
                    snapshot.forEach((childSnap) => {
                        array.push({
                            id: childSnap.key,
                            ...childSnap.val()
                        })
                    })

                    const finalArr = array.slice(0).reverse().map((e) => {
                        return <Notebook key={e.id} data={e} uid={user.uid} />
                    })

                    setNotebooks(finalArr);
                    setUser(true);
                })
            }
        })

        return unsubscribe

    }, [])

    

    return (
        <div className={classes.container}>
            <Typography variant="h2" color="primary" align="center">Notes</Typography>
            <Fab color="primary" aria-label="add" className={classes.AddButton} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <NotebookContainer>
                {
                    (user === false)
                        ? (<div className={classes.loader}>
                            <CircularProgress />
                        </div>)
                        : ((Notebooks.length === 0)
                            ? (<div>
                                    <Typography variant="h2" color="primary" align="center">No Notebook</Typography>
                                    <Typography variant="h5" color="textSecondary" align="center">Get started by adding a new notebook</Typography>
                                </div>
                            )
                            : Notebooks)
                    
                }
            </NotebookContainer>

            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Notebook</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                         You can add Notes in this notebook, which will help you to manage your notes easily.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Notebook Name"
                        label="Notebook Name"
                        type="text"
                        value={notebookName}
                        fullWidth
                        onChange={handleNameChange}
                    />
                    <TextField
                        margin="dense"
                        id="Notebook title"
                        label="Notebook title"
                        type="text"
                        value={notebookDesc}
                        fullWidth
                        onChange={handleDescChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleAddNotebook} color="primary">Add Notebook</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NotesPage

const NotebookContainer = styled.div`
    padding:100px 200px;

    @media screen and (max-width:900px)
    {
        padding:100px 100px;
    }
    @media screen and (max-width:600px)
    {
        padding:50px 20px;
    }
`


// create note/notebook
// if notebook-> a dialog with just notebook name
// if note -> a dialog with title, content

// all this will be shown as accordian seperate for notebook and notes
// a note will have these options -> (open,delete)
// when a note is opened -> (a button at top showing edit note)
// edit note will make the text area editable and edit button will become save button


// notes page
//      Notebook
//          add notebook
//          notebooks
//              notes
//              add note
//      Note
//       
