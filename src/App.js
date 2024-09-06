import React, { useState, useEffect } from 'react';
import { get } from './fetch';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import Playlist from './components/Playlist';
import styles from '../src/css_modules/App.module.css';
import { nanoid } from "nanoid";

function App() {

  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(null);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [arrayList, setArrayList] = useState([]);
  const [playList, setPlayList] = useState('');
  const [arrayLists, setArrayLists] = useState([]);



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
    
    setArrayList(list => {
        if (list.some(obj => obj.index === addObj.index)) {
          return list;
        }

        return [...list, addObj];
      })

    }


  const handleMinusButton = (index) => {
    setArrayList(list => {
      console.log(list);
      return list.filter(obj => obj.index !== index)
    })
  }

  const handleLists = (list) => {

    const obj = {
      playlistName: playList,
      arrList: list 
    }

    setArrayLists(prev => (
      [...prev, obj]
    ))

    if (playList.length < 1) {

    } 

    setPlayList('');
  }

  const namePlaylist = (e) => {
    setPlayList(e.target.value)
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

}, [isActive, data]);



  return (
    <>
      <SearchBar onSearchBarChange={handleChange} value={query} handleSubmit={handleSubmit} handleError={error} />
      <h2>{data.length > 0 ? 'Results' : null}</h2>
      
      <div className={styles.container}>
        <div>
          {data.map((item, index) => (
              item.artists.map((listing, i) => (
                <Results key={`${index}-${nanoid()}`} id={index} song={item.name} album={item.album.name} artist={listing.name} handlePlusButton={handlePlusButton} />
              ))
          ))}
        </div>

        <div>
          {arrayList.length > 1 ?
          <> 
            <input type="text" value={playList} onChange={namePlaylist} placeholder="Name your playlist..." />
            <small>Type in a playList input field!</small>
          </>
          : null}  
          {arrayList?.map((item, index) => (
              <Playlist key={item.index} id={item.index} songName={item.songName} albumnName={item.albumnName} artistName={item.artistName} handleMinusButton={handleMinusButton} />
            ))}
          {arrayList.length > 1 ? <button type="submit" onClick={() => handleLists(arrayList)}>Add to Playlist</button> : null}
          {console.log(arrayLists)}   
        </div>
      </div>  
    </>
  );
}

export default App;
