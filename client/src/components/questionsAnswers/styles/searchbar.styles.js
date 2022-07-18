import styled from 'styled-components';

export const SearchBarWrapper = styled.form`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1rem;
  & input {
    border: 1px solid #333;
    width: 100%;
    height: 100%;
    background: url('https://i.ibb.co/bJTc5MD/noun-search-4968922.webp') no-repeat right 10px center;
    background-size: 25px 25px;
    padding: 0.5rem 0.6rem;
  }
  & input:hover, input:focus {
    background-color: #f1f1f1;
  }

  @media(max-width:500px) {
    height: 3.5rem;
    margin-bottom: 1.5rem;
  }
`;