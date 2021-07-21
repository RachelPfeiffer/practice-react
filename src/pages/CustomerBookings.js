import {useContext} from 'react';
import BookingsContext from "../store/bookings-context";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import LaunchList from './LaunchList';

function CustomerBookings(props){

    const LaunchesLink = props => <Link to='/launches' {...props} />;

    const bookingsState = useContext(BookingsContext);
    let bookingsList = <p>No bookings yet. Plan a trip? <br /><br /><Button variant="outlined" color="primary" component={LaunchesLink}>Upcoming Launches</Button></p>;

    if (bookingsState.bookings.length > 0) {
        bookingsList = <div>
    <LaunchList launches={bookingsState.bookings} />
    </div>;
    }    
    return bookingsList;
}

export default CustomerBookings;