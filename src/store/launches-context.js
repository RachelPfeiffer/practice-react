import { createContext, useState } from 'react';

const LaunchesContext = createContext({
    launches: [],
});

export function LaunchesContextProvider(props) {
    const [launches, setLaunches] = useState([]);

    function loadLaunches(jsonArray) {
        setLaunches((previousLaunches) => {
            return jsonArray;
        } )
    }

    function addWeight(launchID, weight) {
         var launchToAdjust = launches.filter(function(launch){
        return launch.id === launchID; 
    });
    
    for(let launch of launchToAdjust) {
         launch.weight -= weight;
         launch.userWeight = weight;
    };
        return launches;
    };

    function removeWeight(launchID) {
         var launchToAdjust = launches.filter(function(launch){
        return launch.id === launchID; 
    });
    
    for(let launch of launchToAdjust) {
         launch.weight = parseInt(launch.userWeight) + parseInt(launch.weight);
         launch.userWeight = 0;
    };
        return launches;
    };

    const context = {
        launches: launches,
        addWeight: addWeight,
        loadLaunches: loadLaunches,
        removeWeight: removeWeight
    };
    return <LaunchesContext.Provider value={context}>
        {props.children}
    </LaunchesContext.Provider>
}

export default LaunchesContext;