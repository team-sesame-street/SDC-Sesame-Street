import React from 'react';
import styled from 'styled-components';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <SearchBarWrapper data-testid="qa-searchbarform">
      <input data-testid="qa-searchbar" type="textbox" placeholder="Have a question? Search for answers…" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} name="searchterm" />
    </SearchBarWrapper>
  );
}

export default SearchBar;

const SearchBarWrapper = styled.form`
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
`;