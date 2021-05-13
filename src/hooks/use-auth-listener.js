/* eslint-disable */
import React, {useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase'

function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            // we have a user... therefore we can store the user in localstorage
            if(authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                // we don't have an authUser, therefore clear the localstorage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        // cleanup process for hooks , for more info => react documentation

        return () => listener();
    }, [firebase]);

    return { user };
}

export default useAuthListener
