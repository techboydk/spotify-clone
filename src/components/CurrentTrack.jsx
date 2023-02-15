import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';

const CurrentTrack = () => {
    const [{token, currentlyPlaying}, dispatch] = useStateProvider();

    useEffect(()=>{
        const getCurrentTrack = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
                headers:{
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            if(response.data !== ""){
                const {item} = response.data;
                const _currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist)=> artist.name).join(", "),
                    is_playing: false,
                    image: item.album.images[0].url,
                }
                dispatch({type: "SET_PLAYING", currentlyPlaying: _currentlyPlaying})
                
            }
            
        }
        getCurrentTrack();
    },[token, dispatch])
  return (
    <Container>
        {
            currentlyPlaying && (
                <div className="track">
                    <div className="track_image">
                        <img src={currentlyPlaying.image} alt="" />
                    </div>
                    <div className="track_info">
                        <h4>{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artists}</h6>
                    </div>
                </div>
            )
        }
    </Container>
  )
}

export default CurrentTrack;

const Container = styled.div`
    display: flex;
    color: #b3b3b3;
    .track{
        display: flex;
        align-items: center;
        gap: 1rem;
        .track_image{
            height: 4rem;
            width: 4rem;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .track_info{
            h4{
                margin-bottom: 0.05rem;
                color: #fff;
                white-space: nowrap;
                font-size: 0.9rem;
            }
            h6{
                white-space: nowrap;
            }
        }
    }
`