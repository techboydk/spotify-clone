import React, { useEffect } from 'react'
import styled from 'styled-components';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SearchIcon from '@mui/icons-material/Search';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';

const Sidebar = () => {
    const [{ token, playlists }, dispatch] = useStateProvider();

    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                });
            const { items } = response.data;
            const playlists = items.map(({ name, id }) => { return { name, id }; })
            dispatch({ type: "SET_PLAYLISTS", playlists });
        }
        getPlaylistData();
    }, [token, dispatch])
    return (
        <Container>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White-768x230.png" alt="" className="logo" />

            <SidebarOption title="Home" Icon={HomeIcon} />
            <SidebarOption title="Search" Icon={SearchIcon} />
            <SidebarOption title="Library" Icon={LibraryMusicIcon} />

            <br />
            <div className="all_playlists">
                <h4>playlists</h4>
                <hr />
                <div className="playlists">
                    {
                        playlists.map(({ id, name }) => {
                            return <SidebarOption title={name} key={id} />
                        })
                    }

                </div>
            </div>

        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
    background-color: #000;
    .logo{
        width: 80%;
        margin: 1rem 0.5rem 2rem;
    }
    .all_playlists{
        height: 100%;
        overflow: hidden;
        >h4{
            color: #cacaca;
            text-transform: uppercase;
            margin-left: 1.5rem;
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }
        >hr{
            border: .1rem solid #d1d1d14a;
        }
        .playlists{
            height: 42vh;
            overflow: auto;
            cursor: pointer;
            &::-webkit-scrollbar{
                width: .25rem;
                
                &-thumb{
                    background-color: #cacaca89;
                    z-index: 1000;
                    border-radius: 2rem;
                    &:hover{
                        border: 0.5rem solid #fff;
                        cursor: pointer;
                    }
                }
            }
            >p{
                color: #fff;
            }
        }
    }
`