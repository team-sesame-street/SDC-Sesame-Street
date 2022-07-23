import React from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

function Navbar() {
  return (
    <Nav>
      <ListWrapper>
        <li id="logo">
          <span style={{ display: 'flex', gap: '1rem' }}>
            <img src="https://i.imgur.com/RYU33AI.png" style={{ width: '70px', position: 'relative', top: '-10px' }} />
            <h1>Soulful</h1>
          </span>
        </li>
        <li>Men</li>
        <li>Women</li>
        <li>Baby</li>
        <li>Kids</li>
      </ListWrapper>
      <MobileNav>
        <div id="logo">
          <img src="https://i.imgur.com/RYU33AI.png" style={{ width: '40px' }} />
          <span>Soulful</span>
        </div>
        <span>
          <GiHamburgerMenu />
        </span>
      </MobileNav>
    </Nav>
  );
}

const Nav = styled.nav`
  font-weight: 600;
  background: #D5BDAF;
  height: 90px;
  color: #36261D;
  margin: 0;
  padding: 0;
overflow: hidden;
margin-bottom: 25px;
`;

const ListWrapper = styled.ul`
  text-transform: lowercase;
  font-size: 1.5rem;
  margin: 0 auto;
  display: flex;
  list-style-type: none;
  justify-content: center;
  width: 70%;
  align-items: center;

  & li {
    padding: 10px 50px;
    cursor: pointer;
  }

  & li:hover {
    text-decoration: underline;
    color: #222;
  }

  & > li#logo, h1 {
    font-family: 'Homemade Apple';
    text-transform: none;
    cursor: revert;
    flex: 1;
    color: #222;
    font-weight: 900;
    justify-self: start;
    font-size: 2.25rem;
    text-decoration: revert;
    position: relative;
    top: 0.60rem;

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
  font-family: 'Homemade Apple';


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
