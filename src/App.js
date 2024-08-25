import React, { useState, useEffect } from 'react';
import { get } from './fetch';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import Playlist from './components/Playlist';

function App() {

  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(null);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const [obj, setObj] = useState({});
  const [arrayList, setArrayList] = useState([]);



  const handleChange = (addQuery) => {
    setQuery(addQuery);
  }

  const handleSubmit = (addBoolean) => {
    setIsActive(addBoolean);

    if (query.length === 0) {
      setError('Type in a word!');
    }
  }


  const handlePlusButton = (addObj, index) => {
    
    /*
    setData(data => (
      data.filter((info, i) => info.i !== index)
      ))
    */

    setArrayList(list => (
      [...list, addObj]
      ));
  }



  const handleDelete = (index) => {
      setData(data => (
        data.filter((info, i) => info[i] !== index)
      ))
      console.log(data);
  }


useEffect(() => {
  if (query.length > 0 && isActive) {
    get(query).then((response) => {
      setData(response.tracks.items);
    })
  }


  if (isActive) {
    setIsActive(false);
  }

  console.log(arrayList);

}, [isActive, arrayList, data]);



  return (
    <>
      <SearchBar onSearchBarChange={handleChange} value={query} handleSubmit={handleSubmit} handleError={error} />
      <h2>Results</h2>
      
      {data.map((item, index) => (
          item.artists.map((listing, i) => (
            <Results key={index} id={index} song={item.name} album={item.album.name} artist={listing.name} handlePlusButton={handlePlusButton} handleDelete={handleDelete} />
          ))
      ))}
      {arrayList.map((item, index) => (
          <Playlist key={index} id={index} songName={item.songName} albumnName={item.albumnName} artistName={item.artistName} />
        ))}
    </>
  );
}

export default App;
