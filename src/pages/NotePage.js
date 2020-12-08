import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../editorTools';
import Typography from '@material-ui/core/Typography';
import database from '../firebase';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    container: {
        padding: '80px 10px'
    },
    EditorContainer: {
        padding: '20px 5px',
        width: '100%'
    },
    header: {
        padding: '20px 10px',
        background: '#eeeeee',
        borderRadius: '5px'
    },
    button: {
        width: '100px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        top: '83vh',
        width: '100%',
        zIndex: '1000'
    }
});


const NotePage = (props) => {

    const classes = useStyles();
    const [user,setUser]=useState(false);

    var propData;
    if (props.location.noteProps) {
        localStorage.setItem('routeState', JSON.stringify(props.location.noteProps));
        propData = JSON.parse(localStorage.getItem('routeState'));
    }
    else {
        propData = JSON.parse(localStorage.getItem('routeState'));
    }


    const [data, setData] = useState({ ...propData });
    const [noteText, setNoteText] = useState({});
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                database.ref(`users/${user.uid}/Notebooks/${data.notebookRefId}/Notes/${data.noteRefId}/NoteData`).on('value', (snapshot) => {
                    setNoteText(snapshot.val());
                    setUser(true);
                })
            }
        })
        return unsubscribe
    }, [])

    const instanceRef = React.useRef(null);

    const handleSaveNote = async () => {

        
        const savedData = await instanceRef.current.save();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                database.ref(`users/${user.uid}/Notebooks/${data.notebookRefId}/Notes/${data.noteRefId}/NoteData`).set(savedData)
                    .then(() => {

                    })
            } else return null
        })
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h5" color="primary" align="center">{data.noteTitle}</Typography>
            </div>
            <div className={classes.EditorContainer}>
                {
                    (user)
                        ? (<EditorJs  toggleReadonly='true' instanceRef={instance => (instanceRef.current = instance)} data={noteText} tools={EDITOR_JS_TOOLS} placeholder='Write your note here. It gets saved automatically...' onChange={handleSaveNote} />)
                        :(<LoaderContainer>
                            <CircularProgress/>
                        </LoaderContainer>)
                }
            </div>
        </div>
    )
}

export default NotePage


const LoaderContainer = styled.div`
    display:flex;
    justify-content:center;
`