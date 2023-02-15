import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Body = ({headerBackground}) => {

  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();

  const timeconversion = (duration) =>{
    const min = Math.floor(duration/60000);
    const sec = ((duration%60000)/1000).toFixed(0)
    return min + ":" +(sec < 10 ? "0" : "") + sec
  }
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const _selectedPlaylist = {
        id: response.data.id,
        description: response.data.description.startsWith("<a") ? "" : response.data.description,
        name: response.data.name,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items?.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists?.map((artist) => artist?.name),
          image: track.album.images?.[2].url,
          duration: track.duration_ms,
          album: track.album?.name,
          context_uri: track.uri,
          track_number: track?.track_number,
        })),
      }
      dispatch({ type: "SET_PLAYLIST", selectedPlaylist: _selectedPlaylist });
    }

    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId, selectedPlaylist])
  return (
    <Container headerBackground={headerBackground}>
      {
        selectedPlaylist && (
          <>
            <div className="playlist">
              <div className="image">
                <img src={selectedPlaylist.image} alt="" />
              </div>
              <div className="details">
                <span className="type">playlist</span>
                <h1 className="tittle">{selectedPlaylist.name}</h1>
                <p className="desc">{selectedPlaylist.description}</p>

              </div>
            </div>
            <div className="track_list">
              <div className="header_row">
                <div className="col"><span>#</span></div>
                <div className="col"><span>title</span></div>
                <div className="col"><span>album</span></div>
                <div className="col btn"><span><PlayCircleIcon/></span></div>
              </div>
              <div className="tracks">
                {selectedPlaylist.tracks.map(({
                  id,
                  name,
                  artists,
                  image,
                  duration,
                  album,
                  context_uri,
                  track_number,
                }, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col">
                        <span>{index+1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <h4 className="name">{name}</h4>
                          <h6 className="artist">{artists}</h6>
                        </div>
                      </div>
                      <div className="col album">
                        <h5>{album}</h5>
                      </div>
                      <div className="col">
                        <span>{timeconversion(duration)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )
      }

    </Container>
  )
}

export default Body;

const Container = styled.div`
  .playlist{
    margin: 0 2rem;
    display: flex;
    gap: 2rem;
    align-items: flex-end;
    .image{
      width: 15rem;
      box-shadow: 0 0 3rem #0000007a;
      img{
        width: 100%;
      }
    }
    .details{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 0.5rem;
      *{
        color: #fff;
      }
      .type{
        text-transform: uppercase;
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: .1rem;
        color: #e0dede;
      }
      .title{
        font-size: 6vw;
      }
    }
  }
  .track_list{
    .header_row{
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #ebebeb;
      text-transform: uppercase;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({headerBackground})=> headerBackground ? "rgba(0, 0, 0, 0.801)":"none"};
      .btn{
        cursor: pointer;
        transition: 0.3s transform ease-in-out ;
        &:hover{
          transform: scale(1.2);
        }
      }
    }
    .tracks{
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row{
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        color: #fff;
        margin: 1rem 0 0 0;
        padding: 0.5rem 1rem;
        cursor: pointer;
        &:hover{
          background-color: #00000052;
        }
        .col{
          display: flex;
          align-items: center;
          color: #dddcdc;
          img{
            height: 40px;
          }

        }
        .detail{
          display: flex;
          align-items: center;
          gap: 1rem;
          .info{
            display: flex;
            flex-direction: column;
            gap: 0.05rem;
            color: #b3b3b3;
            max-width: 225px;
            overflow: hidden;
            h4{
              color: #fff;
              white-space: nowrap;
              font-size: 0.9rem;
            }
          }
        }
        .album{
          max-width: 200px;
          overflow: hidden;
          h5{
            white-space: nowrap;
          }
        }
      }
    }
  }
`