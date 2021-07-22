import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import RoomIcon from '@material-ui/icons/Room';
import CloseIcon from '@material-ui/icons/Close';
import Moment from 'react-moment';





function BookingModal (props) {

    function handleBookClick () {
        props.toggleBookedHandler();
        props.handleClose();
    }
    if (!props.locationCoordinates) {
      return '';
    }
    return  <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{!props.itemIsBooked && "Book Launch -"} {props.title}
        <p><font color="red">{props.weight === 0 ? 'SOLD OUT' : ''}</font></p>
        <IconButton aria-label="close" onClick={props.handleClose} className='close-button'>
                  <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
            <img src='https://picsum.photos/300' alt='rocket' />
<br />
          <strong>Operator:</strong> {props.operator}<br />
          <strong>Launch Date:</strong> <Moment format="MMMM D, YYYY">{props.launchDate}</Moment><br />
          <strong>Vehicle:</strong> {props.vehicle}<br />
          <strong>Location:</strong> {props.locationName}             
          <a target='_blank'  rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${props.locationCoordinates.latitude},${props.locationCoordinates.longitude}`}>
            <IconButton aria-label="google-map" >
            <RoomIcon />
        </IconButton>
            </a><br />
          <strong>Orbit:</strong> {props.periapsis}x{props.apoapsis} @ {props.inclination}&deg;<br />
          <strong>Total Payload Capacity:</strong> {props.capacity} kg <br />({props.weight} kg available)
          

          <br /><br />
            {!props.itemIsBooked && <DialogContentText>Enter your weight to book this trip!</DialogContentText>}
                  {!props.itemIsBooked && <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Weight"
            type="number"
            InputProps={{ inputProps: { min: 0, max: props.weight, onKeyUp: (e)=>{if (parseInt(e.target.value) > parseInt(e.target.max)) {e.target.value = e.target.max} } } }}
            fullWidth
          /> }
        </DialogContent>
        <DialogActions>

          <Button variant={!props.itemIsBooked ? "contained" : "outlined"} onClick={handleBookClick} color={!props.itemIsBooked ? "primary" : "secondary"} disabled={props.weight === 0 ? true : false}>
            {!props.itemIsBooked ? 'Book' : 'Cancel Booking'} 
          </Button>
          {!props.itemIsBooked && <Button  onClick={props.handleClose} color="secondary" autoFocus>Cancel</Button>}
           
        </DialogActions>
      </Dialog>;
}

export default BookingModal;