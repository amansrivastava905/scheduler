import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
// import NotInterestedSharpIcon from '@material-ui/icons/NotInterestedSharp';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import Zoom from '@material-ui/core/Zoom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ReminderDialog from '../ReminderDialog';
import database from '../../firebase';
import {auth} from '../../firebase';

// styles for material ui
const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0px',
        margin: '10px',
        width:'350px',
        minHeight: '100px',
        overflow: 'hidden',
        borderRadius: '5px',
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
    },
    Typography: {
        color: 'white',
        padding: '10px',
        fontSize: '18px'

    },
    IconButton: {
        color: 'white',
    },
    visualAttendance: {
        height: '3px'
    },
    SubMenuItem: {
        fontSize: '12px'
    },
    accentBlue:{
        backgroundColor:"#3f51b5"
    },
    accentRed:{
        backgroundColor:"#f44336"
    }
}));


// main component
const AttendanceCard = ({...props}) => {


    // styles fro material ui
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

    // initial state of card(will be coming from database)
    const data = {
        subject: props.data.subject,
        present: props.data.present,
        total: props.data.total
    }

    // state hooks for present and total
    const [present, setPresent] = useState(data.present);
    const [total, setTotal] = useState(data.total);

    // function to change present and total
    const handlePresent = () => {
        // setPresent(present + 1);
        // setTotal(total + 1);
        database.ref(`users/${props.uid}/cards/${props.data.id}`).update({
            total:total+1,
            present:present+1
        })
    }

    const handleAbsent = () => {
        // setTotal(total + 1);
        database.ref(`users/${props.uid}/cards/${props.data.id}`).update({
            total:total+1
        })
    }

    const handleResetCard = () => {
        // setTotal(0);
        // setPresent(0);
        database.ref(`users/${props.uid}/cards/${props.data.id}`).update({
            total:0,
            present:0
        })
        handleClose();
    }

    const handleDeleteCard = ()=>{
        database.ref(`users/${props.uid}/cards/${props.data.id}`).remove();
        handleClose();
    }

    // use effect o change state whenever data changes
    useEffect(()=>{
        database.ref(`users/${props.uid}/cards/${props.data.id}`).on('value',(snapshot)=>{
            if(snapshot.val()!==null)
            {
                setTotal(snapshot.val().total);
                setPresent(snapshot.val().present);
            }
        })
    },[])

    // attendance calculation
    let attendance = Math.floor((present / total) * 100);
    if (total === 0) {
        attendance = 0;
    }

    // managing the status
    const leave = Math.floor((100*present-75*total)/75);
    const attend = (0.75*total-present)/0.25;
    let status;
    if(total===0)
    {
         status = "You have not attended any classes";
    }
    else if(attendance<75)
    {
        status = "Its "+attendance+"%. Attend "+attend+" class to get on track.";
    }
    else if(attendance===75)
    {
        status = "Its "+attendance+"%. On the border line. Dont leave any classes.";
    }
    else if(attendance>75)
    {
        status = "Its "+attendance+"%. On track. You may leave "+leave+" classs to chill";
    }

    return (
        <Zoom in={true} style={{ transitionDelay: true ? '100ms' : '0ms' }}>
            <Paper elevation={3} className={classes.container}>
                <Header className={attendance>=75?classes.accentBlue:classes.accentRed}>
                    <Typography align="left" variant="button" className={classes.Typography}>{data.subject}</Typography>
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
                        <MenuItem onClick={handleClose} className={classes.SubMenuItem}><ReminderDialog /></MenuItem>
                        <MenuItem className={classes.SubMenuItem} onClick={handleResetCard}>Reset Card</MenuItem>
                        <MenuItem onClick={handleDeleteCard} className={classes.SubMenuItem}>Delete Card</MenuItem>
                    </Menu>
                </Header>
                <MidContent>
                    <Attendance>
                        <MidContentHead>Attendance</MidContentHead>
                        <MidContentAttendance className={attendance>=75?classes.Blue:classes.Red}><Present>{present}</Present>/<Total>{total}</Total></MidContentAttendance>
                    </Attendance>
                    <Status>
                        <MidContentHead>Status</MidContentHead>
                        <MidContentDesc>{status}</MidContentDesc>
                    </Status>
                </MidContent>
                <div>
                    <LinearProgress variant="determinate" value={attendance} className={classes.visualAttendance} color={attendance>=75?'primary':'secondary'}/>
                    <FooterNav>
                        <IconButton aria-label="done" onClick={handlePresent}>
                            <CheckCircleOutlineSharpIcon />
                        </IconButton>
                        <IconButton aria-label="miss" onClick={handleAbsent}>
                            <CancelSharpIcon />
                        </IconButton>
                        {/* <IconButton aria-label="noClass">
                        <NotInterestedSharpIcon />
                    </IconButton> */}
                    </FooterNav>
                </div>
            </Paper>
        </Zoom>
    )
}

export default AttendanceCard;


// custom styled components
const Header = styled.div`
    
    display:flex;
    justify-content:space-between;
`


const MidContent = styled.div`
    display:flex;
    justify-content:space-between;
    padding:10px;
`

const Attendance = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`

const Status = styled.div`
    flex:1;
`

const MidContentHead = styled.p`
    padding-bottom:5px;
    color:#6e6e6e;
    font-size:12px;
    font-weight:bold;
`

const MidContentAttendance = styled.h4`
    flex-grow:1;
    font-size:24px;
    color:#3f51b5;
`

const MidContentDesc = styled.p`
    color:#434343;
    font-size:12px;
`

const FooterNav = styled.div`
    padding:5px;
    background-color:#eeeeee;
    display:flex;
    justify-content:space-around;
`

const Present = styled.span``

const Total = styled.span``