/* eslint-disable */
import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post'

function Timeline() {
    // const { user } = useContext(LoggedInUserContext);
    const { photos } = usePhotos();

    return (
        <div className="container col-span-2">
            {!photos ? (
                <>
                    <Skeleton  count={4} width={620} height={500} className="mb-5" />
                </>
            ) : (
                photos.map((content) => <Post key={content.docId} content={content} />)
            )}
        </div>
    )
}

export default Timeline;
