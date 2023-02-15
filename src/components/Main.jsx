import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import Body from './Body';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Main = () => {
    const [{token, user}, dispatch] = useStateProvider();
    const bodyRef =  useRef();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);

    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false);
        bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false);

    }
    
    useEffect(()=>{
        const getUserInfo = async () =>{
            const {data} = await axios.get("https://api.spotify.com/v1/me", {
                headers:{
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            const user = {
                name: data.display_name,
                id: data.id,
                profile_image: data.images?.[0].url,
            }
            dispatch({type:"SET_USER", user});
        }
        getUserInfo();
    },[token, dispatch])
  return (
    <Container>
        <div className="spotify_body">
            <Sidebar/>
            <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                <Navbar userInfo ={user} navBackground = {navBackground}/>
                <div className="body_contents">
                    <Body headerBackground = {headerBackground}/>
                </div>
            </div>
        </div>
        <div className="spotify_footer">
            <Footer/>
        </div>
    </Container>
  )
}

export default Main;

const Container = styled.div`
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-rows: 85vh 15vh;
    .spotify_body{
        display: grid;
        grid-template-columns: 15vw 85vw;
        height: 100%;
        width: 100%;
        background: linear-gradient(transparent, rgba(0,0,0,1));
        background-color: #70a2ff;
        .body{
            height: 100%;
            width: 100%;
            overflow: auto;
            &::-webkit-scrollbar{
                display: none;
            }
        }
    }

`