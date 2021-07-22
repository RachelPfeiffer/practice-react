import {useContext} from 'react';
import LaunchesContext from "../store/launches-context";
import List from '@material-ui/core/List';
import LaunchCardShort from './LaunchCardShort';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function LaunchListModal(props) {
    const launchesState = useContext(LaunchesContext);
    console.log(props)
       // console.log(bookingsState);
    const launchEntries = launchesState.launches.map(({ id, title, operator, launch, vehicle, locationName, locationCoordinates, launchDate, periapsis, apoapsis, inclination, weight, capacity  }) => (
        <LaunchCardShort
            key={id}
            id={id}
            title={title}
            operator={operator}
            vehicle={vehicle}
            locationName={locationName}
            periapsis={periapsis}
            apoapsis={apoapsis}
            inclination={inclination}
            weight={weight}
            capacity={capacity}
            launchDate={launchDate}
            locationCoordinates={locationCoordinates}
            handleClose={props.handleClose}
            handleSnackbarOpen={props.handleSnackbarOpen}
            handleSnackbarClose={props.handleSnackbarClose}
        />
        ));
    const launchesList = <Dialog         open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"><List>{launchEntries}</List></Dialog>;
    return launchesList;
}

export default LaunchListModal;