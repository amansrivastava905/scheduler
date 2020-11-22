import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
import NotInterestedSharpIcon from '@material-ui/icons/NotInterestedSharp';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import Zoom from '@material-ui/core/Zoom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ReminderDialog from '../ReminderDialog';


const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0px',
        margin: '10px',
        minWidth: '300px',
        minHeight: '100px',
        overflow: 'hidden',
        borderRadius: '5px'
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
        height: '3px',
    },
    SubMenuItem:{
        fontSize:'12px'
    }
}));

const AttendanceCard = () => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Zoom in={true} style={{ transitionDelay: true ? '100ms' : '0ms' }}>
            <Paper elevation={3} className={classes.container}>
                <Header>
                    <Typography align="left" variant="button" className={classes.Typography}>Mathematics</Typography>
                    <IconButton aria-label="delete" onClick={handleClick}>
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
                        <MenuItem onClick={handleClose} className={classes.SubMenuItem}><ReminderDialog/></MenuItem>
                        <MenuItem onClick={handleClose} className={classes.SubMenuItem}>Delete Card</MenuItem>
                    </Menu>
                </Header>
                <MidContent>
                    <Attendance>
                        <MidContentHead>Attendance</MidContentHead>
                        <MidContentAttendance><Present>43</Present>/<Total>132</Total></MidContentAttendance>
                    </Attendance>
                    <Status>
                        <MidContentHead>Status</MidContentHead>
                        <MidContentDesc>On Track, you may leave next 28 classes.</MidContentDesc>
                    </Status>
                </MidContent>
                <div>
                    <LinearProgress variant="determinate" value={52} className={classes.visualAttendance} />
                </div>
                <FooterNav>
                    <IconButton aria-label="done">
                        <CheckCircleOutlineSharpIcon />
                    </IconButton>
                    <IconButton aria-label="miss">
                        <CancelSharpIcon />
                    </IconButton>
                    <IconButton aria-label="noClass">
                        <NotInterestedSharpIcon />
                    </IconButton>
                </FooterNav>
            </Paper>
        </Zoom>
    )
}

export default AttendanceCard;



const Header = styled.div`
    background-color:#3f50b5;
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
    font-size:14px;
`

const FooterNav = styled.div`
    padding:5px;
    background-color:#eeeeee;
    display:flex;
    justify-content:space-around;
`

const Present = styled.span``

const Total = styled.span``