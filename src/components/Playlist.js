import React from 'react';
import styles from '../css_modules/Results.module.css';

function Playlist(props) {

	const handleButton = (e) => {
	  console.log('Such cock');
	}

    return (
        <>
           	<div>
				<h3>{props.songName}</h3>
				<p><span className={styles.leftSpan}>{props.albumName}</span> <span>{props.artistName}</span></p>
				<button onClick={handleButton}>-</button>
			</div> 
        </>
    )
}

export default Playlist;