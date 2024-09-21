import React, { useState, useEffect } from 'react';
import { authorize, get, createPlaylist, addToPlaylist } from './fetch';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import Playlist from './components/Playlist';
import List from './components/List';
import styles from '../src/css_modules/App.module.css';

const userId = '31k5fnk5mjvh5xtgi5meklkljtca';

function App() {

  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(null);
  const [error, setError] = useState({});
  const [data, setData] = useState([]);
  const [arrayList, setArrayList] = useState([]);
  const [playList, setPlayList] = useState('');
  const [arrayLists, setArrayLists] = useState([]);
  const [readyObj, setReadyObj] = useState([]);

  const handleChange = (addQuery) => {
    setQuery(addQuery);
  }

  const handleSubmit = (addBoolean) => {
    setIsActive(addBoolean);

    if (query.length === 0) {
      const resultsError = 'Type in an input field!';
      setError({ resultsError: resultsError });
    }
  }

  const handlePlusButton = (addObj) => {
    
    setArrayList(list => {
        if (list.some(obj => obj.specialId === addObj.specialId)) {
          return list;
        }

        return [...list, addObj];
      })

    }


  const handleMinusButton = (index) => {
    setArrayList(list => {
      return list.filter(obj => obj.index !== index)
    })
  }

  const handleLists = async (list) => {

    const obj = {
      index: arrayLists.length,  
      playlistName: playList,
      arrList: list,
      playlistSpecialId: await fetchPlaylistId() 
    }

    if (playList.length === 0) {
      const inputFieldError = 'Type in a playlist input field!';
      setError({ inputFieldError: inputFieldError });
    }

    else if (arrayLists.some((listing) => (listing.arrList === list))) {
      const playlistError = 'You already added this playlist!';
      setError({ playlistError: playlistError });
    }

    else {
      setArrayLists(prev => (
        [...prev, obj]
      ))
    }  

    setPlayList('');
  }

  const namePlaylist = (e) => {
    setPlayList(e.target.value)
  }

  function handleSaveButton(obj) {
    /*
    setReadyObj(prev => (
      [...prev, obj]
    ))
    */
    addToPlaylist(obj.playlistSpecialId, obj.songsUri).then((response) => {
      console.log(response);
    })

    setArrayLists(items => (
      items.filter((item, index) => item.playlistSpecialId !== obj.playlistSpecialId)
    ));
  }

  async function fetchPlaylistId() {
    const data = await createPlaylist(userId, playList);
    return data.id  
  }

  /*
  async function saveToSpotify() {
    const data = await addToPlaylist(readyObj.playlistSpecialId, songsUri);
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

}, [isActive]);

  return (
    <>
      <SearchBar onSearchBarChange={handleChange} value={query} handleSubmit={handleSubmit} handleError={error.resultsError} />
      <h2>{data.length > 0 ? 'Results' : null}</h2>

                          <div className={styles.container} >
                          <div>   
                            {data.map((item, index) => (
                              <Results key={item.id} 
                                      index={index}
                                      specialId={item.id} 
                                      song={item.name} 
                                      album={item.album.name}
                                      handlePlusButton={handlePlusButton}
                                      artist={item.artists[0].name}
                                      uris={item.uri}  
                              /> 
                            ))}
                          </div>
                
                          <div>
                            {arrayList.length > 1 ?
                            <> 
                              <input type="text" value={playList} onChange={namePlaylist} placeholder="Name your playlist..." />
                              <small>{error.inputFieldError}</small>
                            </>
                            : null}  
                            {arrayList?.map((item, index) => (
                                <Playlist key={item.specialId} id={item.index} songName={item.songName} albumName={item.albumName} artistName={item.artistName} handleMinusButton={handleMinusButton} />
                              ))}
                            {arrayList.length > 1 ? <button type="submit" onClick={() => handleLists(arrayList)}>Add to Playlist</button> : null}
                            <small>{error.playlistError}</small>
                             {console.log(readyObj)}
                          </div>
                
                          <div>
                            {arrayLists?.map((item) => (
                              <List key={item.index}
                                    playlistId={item.playlistSpecialId}                                                                      
                                    playlistName={item.playlistName}
                                    handleSaveButton={handleSaveButton} 
                                    songsInfo={item.arrList?.map((plate) => ({
                                      songName: plate.songName,
                                      artistName: plate.artistName 
                                    }))}
                                    songsUri={item.arrList?.map(plate => ([
                                        plate.uris 
                                    ]) 
                                  )}
                              />
                              ))}
                          </div>
                      </div>         
    </>
  );
}

export default App;
