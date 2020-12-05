import React, { useState, useEffect }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import database from '../../firebase';


const useStyles = makeStyles({
    container: {
        background:'rgb(255,255,250)',
        borderRadius: '3px',
        padding: '10px',
        margin: '5px 0px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    done:{
        textDecoration:'line-through'
    }
});

const TaskCard = ({...props}) => {

    const classes = useStyles();

    const data = {
        task:props.data.task
    }

    const handleDelete = ()=>{
        database.ref(`users/${props.uid}/schedule/${props.data.id}`).remove();
    }

    const [done,setDone]=useState('');

    useEffect(()=>{
        database.ref(`users/${props.uid}/schedule/${props.data.id}`).on('value',(snapshot)=>{
            if(snapshot.val())
            {
                if(snapshot.val().done===true)
                {
                    setDone(classes.done);
                }
                else
                {
                    setDone('');
                }
            }
        })
    },[])

    const handleDone = ()=>{
        if(done===classes.done)
        {
            database.ref(`users/${props.uid}/schedule/${props.data.id}`).update({done:false});
        }
        else
        {
            database.ref(`users/${props.uid}/schedule/${props.data.id}`).update({done:true});
        }
    }


    return (
        <Zoom in={true} style={{ transitionDelay: true ? '100ms' : '0ms' }}>
        <Paper elevation={1} className={classes.container}>
            <TextContainer>
                <Text className={done}>
                   {data.task}
                </Text>
            </TextContainer>
            <ButtonsContainer>
                <IconButton aria-label="save" className={classes.iconButton} onClick={handleDone}>
                    <DoneOutlineIcon color='primary' fontSize='small' />
                </IconButton>
                <IconButton aria-label="save" className={classes.iconButton} onClick={handleDelete}>
                    <DeleteIcon color='error' fontSize='small'/>
                </IconButton>
            </ButtonsContainer>
        </Paper>
        </Zoom>
    )
}

export default TaskCard


const TextContainer = styled.div`
    width:500px;
    display:flex;
    flex-direction:column;
    justify-content:center;

    @media screen and (max-width:700px)
    {
        width:400px;
    }

    @media screen and (max-width:560px)
    {
        width:300px;
    }

    @media screen and (max-width:450px)
    {
        width:250px;
    }

    @media screen and (max-width:380px)
    {
        width:200px;
    }
    @media screen and (max-width:320px)
    {
        width:150px;
    }
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