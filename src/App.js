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

  const handlePlusButton = (addObj) => {
    
    /*
      const isExists = arrayList.some(obj => addObj.index === obj.index);

      if (!isExists) {
        setArrayList(list => (
          [...list, addObj]
        ));
      }
      */

    setArrayList(list => {
        if (list.some(obj => obj.index === addObj.index)) {
          return list;
        }

        return [...list, addObj];
      })

    }

/*
  const handleMinusButton = (minusObj) => {
    setArrayList(list => {
      list.filter(obj => obj.index !== minusObj.index)
    })
  }  
*/

  const handleMinusButton = (index) => {
    setArrayList(list => {
      list.filter((obj, i) => i !== index)
    })
  }

/*
  const handlePlusButton = (addObj) => {
    
      setArrayList(list => (
        arrayList.forEach(item => {
          if (arrayList.length = 0 || item.index !== addObj.index) {
            [...list, addObj]
          }
          else {
          console.log('Wrong click!');  
          }
        })
      ));
     }   
*/
/*
  const handlePlusButton = (addObj) => {
    if (arrayList.length = 0 || !arrayList) {
      setArrayList(list => (
        [...list, addObj.index[0]]
      ));
    }
  }
*/

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
            <Results key={index} id={index} song={item.name} album={item.album.name} artist={listing.name} handlePlusButton={handlePlusButton} />
          ))
      ))}
      {arrayList?.map((item, index) => (
          <Playlist key={index} id={index} songName={item.songName} albumnName={item.albumnName} artistName={item.artistName} handleMinusButton={handleMinusButton(index)} />
        ))}
    </>
  );
}

export default App;
