import React from 'react';
import styled from 'styled-components';

function Navbar() {
  return (
    <Nav>
      <ListWrapper>
        <li id="logo">👻 Soulful</li>
        <li>Men</li>
        <li>Women</li>
        <li>Baby</li>
        <li>Kids</li>
      </ListWrapper>
      <MobileNav>
        <span>
          Atelier
        </span>
        <span>
          =
        </span>
      </MobileNav>
    </Nav>
  )
}

const Nav = styled.nav`
  font-weight: 600;
  background: whitesmoke;
  height: 80px;
  color: #023E8A;
  margin: 0;
  padding: 0;
overflow: hidden;
border-bottom: 2px solid #eee;
margin-bottom: 5px;
`;

const ListWrapper = styled.ul`
  margin: 0 auto;
  padding: 0;
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
    background: #eee;
    text-decoration: underline;
  }

  & > li#logo {
    cursor: revert;
    flex: 1;
    color: #222;
    font-weight: 900;
    justify-self: start;
    font-size: 1.5rem;
    text-decoration: revert;
  }

  & > li#logo:hover {
    background: revert;
    color: #222;
  }
`;

const MobileNav = styled.div`
  display: none;
  height: 100%;

  @media(max-width: 500px) {
    display: flex;
    height: 100%;
    padding: 0 25px;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Navbar;
