import LaunchCard from '../components/LaunchCard';
import Grid from '@material-ui/core/Grid';


function LaunchList(props) {

    if(props.loading === true) {
        return <div>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
            Loading Launches...
        </div>;
    } else if(props.loadingError === true) {
        return <div>Error loading launches. Try back soon.</div>;
    } else {

      const launchCards = props.launches.map(({ id, title, operator, launch, vehicle, locationName, locationCoordinates, launchDate, periapsis, apoapsis, inclination, weight, capacity  }) => (
        <LaunchCard
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
        />
        ));
        return <Grid container spacing={1} align="stretch" display="flex" >
            {launchCards}
            </Grid>;
    }
    
}
export default LaunchList;