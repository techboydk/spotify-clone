import React from 'react'
import styled from 'styled-components';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RepeatIcon from '@mui/icons-material/Repeat';

const PlayerControls = () => {
    
  return (
    <Container>
        <div className="shuffle">
            <ShuffleIcon/>
        </div>
        <div className="previous">
            <SkipPreviousIcon/>
        </div>
        <div className="player_state">
            {true ? <PlayCircleIcon fontSize='large'/> : <PauseCircleOutlineIcon fontSize='large'/>}
        </div>
        <div className="next">
            <SkipNextIcon/>
        </div>
        <div className="repeat">
            <RepeatIcon/>
        </div>
    </Container>
  )
}

export default PlayerControls;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: #fff;
    svg{
        cursor: pointer;
    }
`