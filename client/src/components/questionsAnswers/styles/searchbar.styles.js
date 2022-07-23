import styled from 'styled-components';

export const SearchBarWrapper = styled.form`
  width: 100%;
  height: 3rem;
  margin-bottom: 1rem;
  & input {
    border-radius: 4px;
    border: 1px solid #333;
    width: 100%;
    height: 100%;
    background: url('https://i.ibb.co/bJTc5MD/noun-search-4968922.webp') no-repeat right 10px center;
    background-size: 25px 25px;
    padding: 0.5rem 0.6rem;
    transition: all 100ms ease-in-out;
  }
  & input:hover, input:focus {
    transition: all 200ms ease-in-out;
    background-color: #f8f8f8;
  }

  @media(max-width:500px) {
    height: 3.5rem;
    margin-bottom: 1.5rem;
  }
`;
