import {useContext, useState } from 'react';
import BookingsContext from "../store/bookings-context";
import LaunchesContext from "../store/launches-context";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import BookingModal from '../components/BookingModal';




function LaunchCardShort(props) {
    const bookingsState = useContext(BookingsContext);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const handleOpen = (e) => {
        if(!e.target.closest('.cancel-booking')) {
            setBookingModalOpen(true);
        } 
    };

    const handleClose = () => {
        setBookingModalOpen(false);
    };

    function handleWeightChange(e) {
      setUserWeight(e.target.value);
    }

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
                weight: props.weight - userWeight,
                capacity: props.capacity,
                launchDate: props.launchDate,
            });
            launchesState.addWeight(props.id, userWeight);
        }
        props.handleClose();
        // props.handleSnackbarOpen();
    }

    const launchMoment = <Moment format="MMMM D, YYYY">{props.launchDate}</Moment>;
    return <ListItem key={props.id}>        
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.title} secondary={launchMoment} />
                {itemIsBooked ? <Button variant='outlined' color='secondary' onClick={toggleBookedHandler}>Cancel Booking</Button> :
                <Button variant='contained' color='primary' onClick={handleOpen} disabled={props.weight === 0 ? true : false}>Book</Button>}
                <BookingModal {...props} open={bookingModalOpen} handleOpen={handleOpen} toggleBookedHandler={toggleBookedHandler} launches={props.launches} handleClose={handleClose} itemIsBooked={itemIsBooked} handleWeightChange={handleWeightChange} />
                   
                </ListItem>;
}

export default LaunchCardShort;