/* eslint-disable */
import React, { useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';
import Skeleton from 'react-loading-skeleton';

function Profile() {
    const { username } = useParams();
    // console.log('username',username);
    const [user, setUser] = useState(null);
    const history = useHistory();
    
    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(username);

            if(user?.userId){
                setUser(user);
            }else {
                history.push(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
        
    }, [username, history]);

    return !user ? (
        <>
            <Skeleton count={1} width={677} height={24} />
        </>
    ): (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    );
    // return user?.username > 0 ? (
    //     <div className="bg-gray-background">
    //     <p>hello</p>
    //         <Header />
    //         <div className="mx-auto max-w-screen-lg">
    //             <UserProfile username={username} />
    //         </div>
    //     </div>
    // ) : null;
}

export default Profile;
