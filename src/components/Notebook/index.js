import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import NoteCard from '../NoteCard';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin:'10px 0px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
    fontSize: '8px'
  },
  accordianDetails:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around'
  }
}));

export default function Notebook() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Maths</Typography>
          <Typography className={classes.secondaryHeading}>Notes of all modules</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordianDetails}>
          <NotebookButtonContainer>
            <Button variant="outlined" color="primary" size="small" className={classes.button} startIcon={<NoteAddIcon />}>Add Note</Button>
            <Button variant="outlined" color="secondary" size="small" className={classes.button} startIcon={<DeleteIcon />}>Delete Notebook</Button>
          </NotebookButtonContainer>
          <NotesContainer>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
          </NotesContainer>
        </AccordionDetails>
      </Accordion>
    </div>
    </Slide>
  );
}



const NotebookButtonContainer = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
  border-radius:5px;
`

const NotesContainer = styled.div`
  margin:0 auto;
  padding:20px 5px;
`
