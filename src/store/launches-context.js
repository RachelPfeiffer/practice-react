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

    function adjustWeight(launchID) {
        return launches.some(launch => launch.id === launchID);
    };

    const context = {
        launches: launches,
        adjustWeight: adjustWeight,
        loadLaunches: loadLaunches
    };
    return <LaunchesContext.Provider value={context}>
        {props.children}
    </LaunchesContext.Provider>
}

export default LaunchesContext;