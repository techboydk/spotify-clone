import React from 'react'
import styled from 'styled-components'
import { loginUrl } from '../utils/spotify'


const Login = () => {
  return (
    <Container>
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black-768x230.png" alt="" />
      <a href={loginUrl}>Login with Spotify</a>
    </Container>
  )
}

export default Login;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
gap: 3rem;
background-color: #1bd954;
img{
  max-height: 20vh;
  max-width: 80vw;
}
a{
  padding: 1rem 5rem;
  border-radius: 5rem;
  background-color: #000;
  font-weight: 800;
  cursor: pointer;
  color: #1bd954;
  font-size: 1.25rem;
}

`