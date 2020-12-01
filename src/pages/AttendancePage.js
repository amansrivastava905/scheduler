import React, { useState, useEffect } from 'react'
import AddCardDialog from '../components/AddCardDialog'
import AttendanceCard from '../components/AttendanceCard'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import AttendanceImage from '../images/attendance.svg';
import database from '../firebase';
import firebase from 'firebase';
import {auth} from '../firebase';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '5px',
        overflow: 'hidden'
    }
}));

// firebase.auth().onAuthStateChanged((user) => {
//   return user;
//   })

console.log(auth.X);

const AttendancePage = () => {
    const cards = [];
    const [attendanceCards,setAttendanceCards]=useState([]);

    useEffect(()=>{
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          database.ref(`users/${user.uid}/cards`).on('value',(snapshot) => {
           const array = [];
           snapshot.forEach((childSnap)=>{
               array.push({
                   id:childSnap.key,
                   ...childSnap.val()
               })
           })

           const finalArr=array.slice(0).reverse().map((e)=>{
               return <AttendanceCard key={e.id} data={e} uid={user.uid}/>
           })

           setAttendanceCards(finalArr);
        })
        }
      })
        
    },[])

    const classes = useStyles();
    return (
        <div className={classes.container}>
           <AddCardDialog />
            <CardContainer>
                {attendanceCards}
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

