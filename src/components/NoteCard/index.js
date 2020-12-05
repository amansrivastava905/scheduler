import React, { useState, useEffect }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';

const useStyles = makeStyles({
    container: {
        background:'rgb(255,255,250)',
        borderRadius: '3px',
        padding: '10px',
        margin: '5px 0px',
        display: 'flex',
        justifyContent: 'space-between'
    }
});


const NoteCard = () => {

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

    return (
         <Paper elevation={1} className={classes.container}>
            <TextContainer>
                <Text>
                   Title of my note goes here. It can be large enough as you can see
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
                        <MenuItem onClick={handleClose} className={classes.SubMenuItem} >delete</MenuItem>
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