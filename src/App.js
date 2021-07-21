import MainNav from './layout/MainNav';
import SideNav from './layout/SideNav';
import LaunchList from './pages/LaunchList';
import CustomerBookings from './pages/CustomerBookings';
import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';





function App(props) {
    const [launchesLoading, setLaunchesLoading] = useState(true);
    const [launches, setLaunches] = useState([]);
    const [loadingError, setLoadingError] = useState(false);

    if(launchesLoading) {
    fetch('api/launches.json',
        {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
    .then(data => data.json())
    .then((launches) => {
          setLaunchesLoading(false)
          const mappedLaunches = launches.map((entry) => {
            return {
              id: entry.id,
              title: entry.title,
              operator: entry.operator,
              locationName: entry.launch.location.name,
              locationCoordinates: {latitude: entry.launch.location.latitude, longitude: entry.launch.location.longitude},
              vehicle: entry.launch.vehicle,
              periapsis: entry.orbit.periapsis,
              apoapsis: entry.orbit.apoapsis,
              inclination: entry.orbit.inclination,
              weight: entry.payload.available,
              capacity: entry.payload.capacity,
              launchDate: entry.launch.date
            }
          })
          setLaunches(mappedLaunches);
        }, (error) => {
          setLaunchesLoading(false);
          setLoadingError(true);
        }) 
    };


    return <div>
    <MainNav />
    <Grid container>
          <SideNav />
       <Grid item xs={12} md={10} >
        <Box border={1} minHeight="90vh" p={2}>
            <Switch>
              <Route path="/" exact >
                  <h2>Upcoming Launches</h2>
                  <LaunchList launches={launches} loading={launchesLoading} loadingError={loadingError}  />
              </Route>
              <Route path="/launches">
                  <h2>Upcoming Launches</h2>
                  <LaunchList launches={launches} loading={launchesLoading} loadingError={loadingError} />
              </Route>
              <Route path="/bookings">
                  <h2>My Bookings</h2>
                  <CustomerBookings launches={launches} loading={launchesLoading} loadingError={loadingError} />
              </Route>
            </Switch>
          </Box>
    </Grid>      
  </Grid>
  </div>;
}

export default App;
