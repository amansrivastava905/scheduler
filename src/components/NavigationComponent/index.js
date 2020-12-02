// imports for bottom nav
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';

// top nav
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



// bottom nav
const useStyles = makeStyles({
  bottomNav: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    boxShadow: '0px -1px 6px -4px rgba(0,0,0,0.75)',
    zIndex: 100
  }
});



export function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Zoom in={true} style={{ transitionDelay: true ? '500ms' : '0ms' }}>
      <BottomNavigation value={value} onChange={handleChange} className={classes.bottomNav} showLabels={true}>
        
        <BottomNavigationAction label="Attendance" value="Attendance" icon={<SchoolIcon />} component={Link} to={'/'} />
        <BottomNavigationAction label="Schedule" value="Schedule" icon={<ScheduleIcon />} component={Link} to={'/schedule'} />
        <BottomNavigationAction label="Account" value="Account" icon={<PersonIcon />} component={Link} to={'/account'} />
      </BottomNavigation>
      </Zoom>
    </div>
  );
}



// top nav
const useStylesTop = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export function TopBar() {
  const classes = useStylesTop();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="regular">
          <Typography variant="h4" color="inherit">
            REVED
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
