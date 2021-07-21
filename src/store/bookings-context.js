import { createContext, useState } from 'react';

const BookingsContext = createContext({
    bookings: [],
    totalBookings: 0
});

export function BookingsContextProvider(props) {
    const [userBookings, setUserBookings] = useState([]);

    function addBookingHandler(launch) {
        setUserBookings((previousBookings) => {
            return previousBookings.concat(launch);
        } )
    }

    function removeBookingHandler(launchID) {
        setUserBookings((previousBookings) => {
            return previousBookings.filter(launch => launch.id !== launchID)
        })
    }

    function itemIsBooked(launchID) {
        return userBookings.some(launch => launch.id === launchID);
    };

    const context = {
        bookings: userBookings,
        totalBookings: userBookings.length,
        addBooking: addBookingHandler,
        removeBooking: removeBookingHandler,
        itemIsBooked: itemIsBooked
    };
    return <BookingsContext.Provider value={context}>
        {props.children}
    </BookingsContext.Provider>
}

export default BookingsContext;