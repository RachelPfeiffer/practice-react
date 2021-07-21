import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';



function MainNav(props) {
const useStyles = makeStyles((theme) => ({
appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'relative'
  }

}));
  const classes = useStyles();

    return <div>
        <AppBar position="static" display="flex" className={classes.appBar}>
        <Toolbar>
            <Box flexGrow={1}>
                 <IconButton edge="start" color="inherit" aria-label="menu" >
                    <MenuIcon />
                </IconButton>
                Space Launch Service
            </Box>
         
            <IconButton edge="start" color="inherit" aria-label="settings">
                <SettingsIcon />
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="notifications">
                <NotificationsIcon />
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="user-account">
                <PersonIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </div>;
}

export default MainNav;