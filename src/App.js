import React, { useState, useEffect } from 'react';
import { get } from './fetch';
import SearchBar from './components/SearchBar';
import Results from './components/Results';

function App() {

  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);


  const handleChange = (addQuery) => {
    setQuery(addQuery);
  }

  const handleSubmit = (addBoolean) => {
    setIsActive(addBoolean);
  }


useEffect(() => {
  get(query).then((response) => {
    console.log(response.tracks);
  })
}, []);



  return (
    <>
      <SearchBar onSearchBarChange={handleChange} value={query} isActive={handleSubmit} />
      <Results />
    </>
  );
}

export default App;
