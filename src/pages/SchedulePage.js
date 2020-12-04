import React,{useState,useEffect} from 'react'
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import AddTask from '../components/AddTask';
import TaskCard from '../components/TaskCard';
import database from '../firebase';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    container: {
        marginTop: '80px',
        padding:'10px'
    }
});



const SchedulePage = () => {

    const classes = useStyles();
    
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                database.ref(`users/${user.uid}/schedule`).on('value', (snapshot) => {
                    const array = [];
                    snapshot.forEach((childSnap) => {
                        array.push({
                            id: childSnap.key,
                            ...childSnap.val()
                        })
                    })

                    const finalArr = array.slice(0).reverse().map((e) => {
                        return <TaskCard key={e.id} data={e} uid={user.uid}/>
                    })

                    setTasks(finalArr);
                    setUser(true);
                })
            }
        })

        return unsubscribe

    }, [])


    return (
        <Grow in={true} mountOnEnter unmountOnExit>
            <div className={classes.container}>
                <Typography variant="h2" color="primary" align="center">Daily Schedule</Typography>
                <AddTask/>
                <TaskContainer>
                   {
                       (user === false)
                       ? (<div className={classes.loader}>
                           <CircularProgress />
                       </div>)
                       : ((tasks.length === 0)
                           ? (<div>
                                   <Typography variant="h2" color="primary" align="center">No Tasks</Typography>
                                   <Typography variant="h5" color="textSecondary" align="center">Add some tasks</Typography>
                               </div>
                           )
                           : tasks)
                   }
                </TaskContainer>
            </div>
        </Grow>
    )
}

export default SchedulePage



const TaskContainer = styled.div`
    padding:50px 100px 100px 100px;
    display:flex; 
    flex-direction:column;
    justify-content:center;
    align-items:center;

    @media screen and (max-width:700px)
    {
        padding:30px 5px 100px 5px;
    }
`