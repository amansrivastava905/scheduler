import React, { useState, useEffect }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import database from '../../firebase';

const useStyles = makeStyles({
    container: {
        background:'rgb(255,255,250)',
        borderRadius: '3px',
        padding: '10px',
        margin: '5px 0px',
        display: 'flex',
        justifyContent: 'space-between',
        minWidth:'80%'
    }
});


const NoteCard = (props) => {

    const data = {
        noteDesc: props.data.noteDesc
      }

    const classes = useStyles();
    // state for material component
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // functions to mange state for material components
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteNotebook = () => {
        database.ref(`users/${props.uid}/Notebooks/${props.data.parentNotebookRef}/Notes/${props.data.id}`).remove();
        handleClose();
      }

    return (
         <Paper elevation={1} className={classes.container}>
            <TextContainer>
                <Text>
                   {data.noteDesc}
                </Text>
            </TextContainer>
            <ButtonsContainer>
            <IconButton aria-label="3 dot menu" onClick={handleClick}>
                        <MoreVertIcon className={classes.IconButton} />
                    </IconButton>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleClose} className={classes.SubMenuItem}>Edit</MenuItem>
                        <MenuItem className={classes.SubMenuItem} onClick={handleDeleteNotebook} >delete</MenuItem>
                    </Menu>
            </ButtonsContainer>
        </Paper>
    )
}

export default NoteCard



const TextContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
`

const Text = styled.p`
    width:100%;
    word-break:break-all;
    font-weight:lighter;
    font-size:14px;
`

const ButtonsContainer = styled.div`
    padding-left:5px;
    display:flex;
    justify-content:center;
`