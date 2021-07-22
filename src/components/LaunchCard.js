import {useContext, useState} from 'react';
import rocketImage from '../images/rocket-icon.png';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import BookingsContext from "../store/bookings-context";
import LaunchesContext from "../store/launches-context";
import BookingModal from './BookingModal';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';




function LaunchCard(props){

    const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

    const bookingsState = useContext(BookingsContext);
    const launchesState = useContext(LaunchesContext);
    const [userWeight, setUserWeight] = useState(0);
    const itemIsBooked = bookingsState.itemIsBooked(props.id);
    function toggleBookedHandler() {
        if (itemIsBooked) {
            bookingsState.removeBooking(props.id);
            launchesState.removeWeight(props.id);
        } else {
            bookingsState.addBooking({
                id: props.id,
                key: props.id,
                title: props.title,
                operator: props.operator,
                vehicle: props.vehicle,
                locationName: props.locationName,
                locationCoordinates: props.locationCoordinates,
                periapsis: props.periapsis,
                apoapsis: props.apoapsis,
                inclination: props.inclination,
                weight: props.weight,
                capacity: props.capacity,
                launchDate: props.launchDate,
            });
            launchesState.addWeight(props.id, userWeight);
        }
        handleSnackbarOpen();
    }

    function addHoverClass(e) {
        const card = e.target.closest('.MuiCard-root');
        if (card !== null) {
            card.style.setProperty("-webkit-filter", "drop-shadow(5px 5px 5px #222)");
        }
    }

    function removeHoverClass(e) {
        const card = e.target.closest('.MuiCard-root');
        if(card !== null) {
            card.style.setProperty("-webkit-filter", "drop-shadow(0px  0px 0px #222)");
        }
    }

        function handleWeightChange(e) {
      setUserWeight(e.target.value);
    }

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = (e) => {
        if(!e.target.closest('.cancel-booking')) {
            setModalOpen(true);
        } 
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }, 
    card: {
        transition:  'all .1s linear',
        filter: 'drop-shadow(0px 1px 2px 0px rgba(0,0,0,0.4))'
    }}));
    const classes = useStyles();
    return <Grid item xl={4} md={6} xs={12} className={classes.root}>
    <Card variant="outlined" border={2} className={classes.card} onMouseOver={addHoverClass} onMouseLeave={removeHoverClass} onClick={handleOpen}>
      <CardContent>
        <Grid container>
            <Grid item container xs={2} justifyContent="center"  >
                <Grid align='center' item xs={12}>
                    <img className='rocket-logo' src={rocketImage} alt='rocket' />
                </Grid>
                <Grid item><span className='small'>{props.vehicle}</span></Grid>
            </Grid>
            <Grid item xs={9} >
                <Box m={2}><h3 >{props.title}</h3></Box>
            </Grid>
        </Grid>
        <Box my={1}><a href='google.com'>{props.operator}</a> | {props.locationName} </Box>
        <Box my={1}> <strong>Orbit:</strong> {props.periapsis}x{props.apoapsis} @ {props.inclination}&deg;</Box>
        <Box display="flex" my={1}>
            <Box flexGrow={1} className={props.weight > 1000 ? 'green' : (props.weight > 0 ? 'orange' : 'red')}>{props.weight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kg available</Box>
            <Box ><Moment format="MMMM D, YYYY">{props.launchDate}</Moment></Box>            
        </Box>
        <Box display="flex" justifyContent="flex-end">
            <Button variant={!itemIsBooked ? "contained" : "outlined"} className={itemIsBooked ? 'cancel-booking' : ''} color={itemIsBooked ? 'secondary' : 'primary'} disabled={props.weight === 0 && !itemIsBooked ? true : false} onClick={itemIsBooked ? toggleBookedHandler : handleOpen} >
                {itemIsBooked ? 'Cancel Booking' : 'Book'} 
            </Button>
        </Box>       
        
      </CardContent>
    </Card>
    <BookingModal {...props} open={modalOpen} handleOpen={handleOpen} toggleBookedHandler={toggleBookedHandler} launches={props.launches} handleClose={handleClose} itemIsBooked={itemIsBooked} handleWeightChange={handleWeightChange}/>
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
                open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={itemIsBooked ? "Launch booked successfully." : "Booking cancelled."}
        action={
          <div>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />
    </Grid>;
}

export default LaunchCard;