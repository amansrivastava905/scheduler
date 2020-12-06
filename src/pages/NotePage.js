import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../editorTools';
import Typography from '@material-ui/core/Typography';
import database from '../firebase';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
    container: {
        padding: '80px 10px'
    },
    EditorContainer: {
        padding: '20px 5px',
        width: '100%'
    },
    header:{
        padding:'20px 10px',
        background:'#eeeeee',
        borderRadius:'5px'
    },
    button:{
        width:'200px'
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'center',
        position:'fixed',
        top:'75vh',
        width:'100%'
    }
});


const NotePage = () => {

    const classes = useStyles();
    var data={};

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h5" color="Primary" align="center">Working on this feature</Typography>
            </div>
            <div className={classes.EditorContainer}>
                <EditorJs data={data} tools={EDITOR_JS_TOOLS} placeholder='your Note goes here...' />
            </div>
            <div className={classes.buttonContainer}>
                <Button className={classes.button} variant='contained' color='primary' startIcon={<SaveIcon/>} size='medium' fullWidth='true'>Save</Button>
            </div>
        </div>
    )
}

export default NotePage