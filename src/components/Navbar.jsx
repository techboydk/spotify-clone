import React from 'react'
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';

const Navbar = ({userInfo, navBackground}) => {

  return (
    <Container key={userInfo?.id} navBackground={navBackground}>
      <div className="search_box">
        <SearchIcon/>
        <input type="text" placeholder='search artist, songs, podcasts' />
      </div>
      <div className="user_info">
        <Avatar className='avatar' src={userInfo?.profile_image} alt='user_profile'/>
        <h4>{userInfo?.name}</h4>
      </div>
    </Container>
  )
}

export default Navbar;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  padding: 2rem;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({navBackground})=> navBackground ? "rgba(0,0,0,0.7)":"none"};
  .search_box{
    background-color: #fff;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    width: 30%;
    input{
      border: none;
      outline: none;
      font-size: 1rem;
      width: 100%;
    }
  }
  .user_info{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem 0.25rem 0.25rem;
    background-color: #60e2c678;
    border-radius: 10rem;
    cursor: pointer;
    .avatar{
      width: 1.75rem;
      height: 1.75rem;
    }
    h4{
      font-size: .85rem;
      text-transform: capitalize;
    }
  }
`