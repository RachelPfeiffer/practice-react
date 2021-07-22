import {useContext, useState} from 'react';
import BookingsContext from "../store/bookings-context";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LaunchList from './LaunchList';
import LaunchListModal from '../components/LaunchListModal';

function CustomerBookings(props){

    const bookingsState = useContext(BookingsContext);
    const [listModalOpen, setListModalOpen] = useState(false);

    const openLaunchListModal = () => {
        setListModalOpen(true);
    }

    const handleClose = () => {
        setListModalOpen(false);
    };
    let bookingsList = <p>No bookings yet. Plan a trip? 
    <br /><br />
    <Button variant="outlined" color="primary" onClick={openLaunchListModal} >Upcoming Launches</Button>
    { listModalOpen &&<LaunchListModal open={listModalOpen} handleClose={handleClose} />} </p>;

    if (bookingsState.bookings.length > 0) {
        bookingsList = <div>
    <LaunchList launches={bookingsState.bookings} />
    <Fab color="primary" className="fab-add-booking" aria-label="add" onClick={openLaunchListModal}>
        <AddIcon />
    </Fab>
    { listModalOpen &&<LaunchListModal open={listModalOpen} handleClose={handleClose}  />}
    </div>;
    }    
    return bookingsList;
}

export default CustomerBookings;