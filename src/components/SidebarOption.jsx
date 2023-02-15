import React from 'react'
import styled from 'styled-components';

const SidebarOption = ({Icon, title}) => {
  return (
    <Container>
        {Icon && <Icon />}
        {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </Container>
  )
}

export default SidebarOption;

const Container = styled.div`
    color: #868686;
    display: flex;
    align-items: center;
    margin: 0.75rem 0 .75rem 1.5rem;
    gap: 10px;
    transition: 0.2s color ease-in-out;
    &:hover{
        color: #fff;
        cursor: pointer;
    }
`