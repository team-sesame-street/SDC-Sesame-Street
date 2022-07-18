import React from 'react';

import { SearchBarWrapper } from './styles/searchbar.styles';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <SearchBarWrapper data-testid="qa-searchbarform">
      <input data-testid="qa-searchbar" type="textbox" placeholder="Have a question? Search for answers…" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} name="searchterm" />
    </SearchBarWrapper>
  );
}

export default SearchBar;
