import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import NoteCard from '../NoteCard';
import Slide from '@material-ui/core/Slide';
import database from '../../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '10px 0px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
    fontSize: '8px'
  },
  accordianDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
}));

export default function Notebook(props) {

  const data = {
    notebookName: props.data.notebookName,
    notebookDesc: props.data.notebookDesc
  }
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDeleteNotebook = () => {
    database.ref(`users/${props.uid}/Notebooks/${props.data.id}`).remove();
  }

  // add a new note
  const [openDialog, setOpenDialog] = useState(false);
  const handleAddNoteDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const [noteDesc, setNoteDesc] = useState('');

  const handleNoteDesc = (e) => {
    setNoteDesc(e.target.value);
  }

  const handleAddNoteDesc = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setNoteDesc('');
        if (noteDesc !== '') {
          database.ref(`users/${user.uid}/Notebooks/${props.data.id}/Notes`).push({
            noteDesc: noteDesc
          }).then(() => {
            setNoteDesc('');
          })
        }
        else {

        }
      } else return null
    })
    handleClose();
  }

  // show notebooks
  const [Notes, setNotes] = useState([]);
  const [user, setUser] = useState(false);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        database.ref(`users/${user.uid}/Notebooks/${props.data.id}/Notes`).on('value', (snapshot) => {
          const array = [];
          snapshot.forEach((childSnap) => {
            array.push({
              id: childSnap.key,
              parentNotebookRef:props.data.id,
              parentNotebookName:props.data.notebookName,
              ...childSnap.val()
            })
          })

          const finalArr = array.slice(0).reverse().map((e) => {
            return <NoteCard key={e.id} data={e} uid={user.uid} />
          })

          setNotes(finalArr);
          setUser(true);
        })
      }
    })

    return unsubscribe

  }, [])


  return (
    <div>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div className={classes.root}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{data.notebookName}</Typography>
              <Typography className={classes.secondaryHeading}>{data.notebookDesc}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordianDetails}>
              <NotebookButtonContainer>
                <Button variant="outlined" color="primary" size="small" className={classes.button} startIcon={<NoteAddIcon />} onClick={handleAddNoteDialog}>Add Note</Button>
                <Button variant="outlined" color="secondary" size="small" className={classes.button} startIcon={<DeleteIcon />} onClick={handleDeleteNotebook}>Delete Notebook</Button>
              </NotebookButtonContainer>
              <NotesContainer>
              {
                    (user === false)
                        ? (<div className={classes.loader}>
                            <CircularProgress />
                        </div>)
                        : ((Notes.length === 0)
                            ? (<div>
                                    <Typography variant="h6" color="textSecondary" align="center">Create a note, then click that note to view/edit it.</Typography>
                                </div>
                            )
                            : Notes)
                    
                }
              </NotesContainer>
            </AccordionDetails>
          </Accordion>
        </div>
      </Slide>
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to create a note in your notebook. Write a short decription in few words.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Note Description"
            label="Note Description"
            type="text"
            value={noteDesc}
            fullWidth
            onChange={handleNoteDesc}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleAddNoteDesc} color="primary">Create Note</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const NotebookButtonContainer = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
  border-radius:5px;
`

const NotesContainer = styled.div`
  margin:0 auto;
  padding:20px 5px;
`
