import React, { useState, useEffect } from 'react'
import AddCardDialog from '../components/AddCardDialog'
import AttendanceCard from '../components/AttendanceCard'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import AttendanceImage from '../images/attendance.svg';
import database from '../firebase';
import firebase from 'firebase';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '5px',
        overflow: 'hidden'
    }
}));

// firebase.auth().onAuthStateChanged((user) => {
//   return user;
//   })


const AttendancePage = () => {
    const cards = [];
    const [attendanceCards, setAttendanceCards] = useState([]);
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                database.ref(`users/${user.uid}/cards`).on('value', (snapshot) => {
                    const array = [];
                    snapshot.forEach((childSnap) => {
                        array.push({
                            id: childSnap.key,
                            ...childSnap.val()
                        })
                    })

                    const finalArr = array.slice(0).reverse().map((e) => {
                        return <AttendanceCard key={e.id} data={e} uid={user.uid} />
                    })

                    setAttendanceCards(finalArr);
                    setUser(true);
                })
            }
        })

        return unsubscribe

    }, [user])

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <AddCardDialog />
            <CardContainer>
                {(user === false)
                    ? (<div className={classes.loader}>
                        <CircularProgress />
                    </div>)
                    : ((attendanceCards.length === 0)
                        ? (<div>
                                <Typography variant="h2" color="primary" align="center">No Cards Here</Typography>
                                <Typography variant="h5" color="textSecondary" align="center">Use above form to add new subject card.</Typography>
                            </div>
                        )
                        : attendanceCards)
                }
            </CardContainer>
            <ImageContainer>
                <Image src={AttendanceImage} />
            </ImageContainer>
        </div>
    )
}

export default AttendancePage



const CardContainer = styled.div`
    padding:50px 100px 100px 100px;
    display:flex; 
    flex-wrap:wrap;
    justify-content:center;

    @media screen and (max-width:700px)
    {
        padding:30px 5px 100px 5px;
    }
`

const ImageContainer = styled.div`
    display:flex;
    justify-content:center;
    padding-bottom:50px;
`

const Image = styled.img`
    width:500px;
   @media screen and (max-width:500px)
    {
       width:100%;
    }
`

