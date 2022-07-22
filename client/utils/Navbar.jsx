import React from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

function Navbar() {
  return (
    <Nav>
      <ListWrapper>
        <li id="logo">
          <span style={{display: 'flex', gap: '1rem'}}>
            <img src="https://i.imgur.com/RYU33AI.png" style={{width: '50px', position: 'relative', top: '-10px'}}/>Soulful
          </span>
        </li>
        <li>Men</li>
        <li>Women</li>
        <li>Baby</li>
        <li>Kids</li>
      </ListWrapper>
      <MobileNav>
        <div id="logo">
          <img src="https://i.imgur.com/RYU33AI.png" style={{width: '40px'}}/>
          <span>Soulful</span>
        </div>
        <span>
          <GiHamburgerMenu/>
        </span>
      </MobileNav>
    </Nav>
  )
}

const Nav = styled.nav`
  & #logo {
    font-family: 'Homemade Apple';
  }

  font-weight: 600;
  background-image: linear-gradient(
  180deg,
  hsl(21deg 32% 91%) 0%,
  hsl(21deg 32% 92%) 21%,
  hsl(21deg 32% 93%) 30%,
  hsl(21deg 32% 94%) 39%,
  hsl(21deg 32% 95%) 46%,
  hsl(21deg 32% 96%) 54%,
  hsl(21deg 32% 97%) 61%,
  hsl(21deg 33% 98%) 69%,
  hsl(21deg 33% 99%) 79%,
  hsl(0deg 0% 100%) 100%
);
  height: 90px;
  color: #36261D;
  margin: 0;
  padding: 0;
overflow: hidden;
margin-bottom: 5px;
`;

const ListWrapper = styled.ul`
  margin: 0 auto;
  display: flex;
  list-style-type: none;
  justify-content: center;
  width: 70%;
  align-items: center;

  & li {
    padding: 30px 50px;
    cursor: pointer;
  }

  & li:hover {
    text-decoration: underline;
    color: #222;
  }

  & > li#logo {
    font-family: 'Homemade Apple';
    cursor: revert;
    flex: 1;
    color: #222;
    font-weight: 900;
    justify-self: start;
    font-size: 2rem;
    text-decoration: revert;
    position: relative;
    top: 0.5rem;
  }

  & > li#logo > span{
    @media(max-width: 1200px) {
      display: none;
    }
  }

  & > li#logo:hover {
    background: revert;
    color: #222;
  }

  @media(max-width: 500px) {
    display: none;
  }
`;

const MobileNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  font-size: 1.25rem;
  font-weight: 800;


  & div#logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    top: -10px;
    gap: 1rem;
  }

  & div#logo > img {

  }
`;

export default Navbar;
