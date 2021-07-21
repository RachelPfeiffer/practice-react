import React from 'react';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';


function SideNav(props) {
    const LaunchesLink = props => <Link to='/launches' {...props} />;
    const BookingsLink = props => <Link to='/bookings' {...props} />;


    return <Grid item xs={12} md={2}>
        <List>
          <ListItem button component={LaunchesLink}>
          <ListItemIcon><Icon className="fas fa-rocket" /></ListItemIcon>
          <ListItemText primary="UPCOMING LAUNCHES" />
        </ListItem>
        <ListItem button component={BookingsLink}>
          <ListItemIcon><FavoriteIcon /></ListItemIcon>
          <ListItemText primary="MY BOOKINGS"  />
        </ListItem>
        </List>
    </Grid>
    
}

export default SideNav;