import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from '../App';
import { ADD_PLAYLISTS, ADD_LOCAL_PLAYLISTS, SAVE_PLAYLIST } from '../utils/constants';
import { get } from '../utils/api';

const Playlists = () => {
    const [loading,setLoading] = useState(true);
    const { state, dispatch } = useContext(StoreContext);
    const [alreadyAdded,setAlreadyAdded] = useState(false);

    useEffect(async () => {
        const data = await get('https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=20');
        setLoading(false);
        setLoading(false);
        if(data){
            const localPlaylists = localStorage.getItem('@myPlaylists') ? JSON.parse(localStorage.getItem('@myPlaylists')) : [];
            dispatch({type: ADD_PLAYLISTS, payload: data.playlists.items});
            dispatch({type: ADD_LOCAL_PLAYLISTS, payload: localPlaylists});
        }else{
            localStorage.removeItem('@accessToken');
            localStorage.removeItem('@expiryTime');
            window.location.reload();
        }
    },[]);

    const handleDragStart = (e,playlist) => {
        e.dataTransfer.setData("playlist",JSON.stringify(playlist));
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleOnDrop = (e) => {
        if(e.target.id == "dropzone"){
            const playlist = JSON.parse(e.dataTransfer.getData("playlist"));
            console.log(playlist.id);
            if(state.local_playlists.filter((val,i) => val.id === playlist.id).length){
                setAlreadyAdded(true);
                setTimeout(() => {
                    setAlreadyAdded(alreadyAdded => !alreadyAdded)}
                ,500);
            }else{
                setAlreadyAdded(false);
                dispatch({type: SAVE_PLAYLIST, payload: playlist});
                let playlists = localStorage.getItem('@myPlaylists') ? JSON.parse(localStorage.getItem('@myPlaylists')) : [];
                playlists.push(playlist);
                localStorage.setItem('@myPlaylists',JSON.stringify(playlists));
            }
        }
    }

    return (
        <>
            {loading && <h1>Loading</h1>}
            <div className="container">
                <div className="playlist remote">
                    <h2>Remote Playlist</h2>
                    <div className="playlist-container">
                        {state.playlists && state.playlists.map((val,i) => (
                            <div key={val.id} draggable="true" onDragStart={(e) => handleDragStart(e,val)} className="playlist-item">
                                <img src={val.images.length && val.images[0].url} />
                                <h2>{val.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="playlist local">
                    {alreadyAdded && <h2 style={{color:'red'}}>Already saved in playlist</h2>}
                    <h2>Local Playlist</h2>
                    <div id="dropzone" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleOnDrop(e)} >
                        <h2>Drop playlist here to save in local</h2>
                    </div>
                    <div className="playlist-container">
                        {state.local_playlists && state.local_playlists.map((val,i) => (
                            <div key={val.id} draggable="true" onDragStart={(e) => handleDragStart(e,val)} className="playlist-item">
                                <img src={val.images.length && val.images[0].url} />
                                <h2>{val.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Playlists;