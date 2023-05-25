import React, { createContext, useContext, useState } from 'react';

const SearchQueryContext = createContext();
export const useCustomContext = () => useContext(SearchQueryContext);

const Context = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  return (
    <SearchQueryContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export default Context;
