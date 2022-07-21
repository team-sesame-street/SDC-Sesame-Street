import React from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

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
        👻 Soulful
        </span>
        <span>
          <GiHamburgerMenu/>
        </span>
      </MobileNav>
    </Nav>
  )
}

const Nav = styled.nav`
  font-weight: 600;
  background: whitesmoke;
  height: 90px;
  color: #023E8A;
  margin: 0;
  padding: 0;
overflow: hidden;
margin-bottom: 5px;
background-image: linear-gradient(
  0deg,
  hsl(0deg 0% 100%) 0%,
  hsl(192deg 62% 100%) 21%,
  hsl(192deg 62% 99%) 30%,
  hsl(192deg 62% 99%) 39%,
  hsl(192deg 62% 99%) 46%,
  hsl(192deg 62% 98%) 54%,
  hsl(192deg 62% 98%) 61%,
  hsl(192deg 62% 98%) 69%,
  hsl(192deg 62% 97%) 79%,
  hsl(192deg 63% 97%) 100%
);
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
`;

export default Navbar;
