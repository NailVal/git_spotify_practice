import React from 'react';
import styles from '../css_modules/Results.module.css';

function Playlist(props) {

	
	const handleButton = () => {
		props.handleMinusButton(props.id);
	}
	
    return (
        <>
           	<div id={props.id}>
				<h3>{props.songName}</h3>
				<p><span className={styles.leftSpan}>{props.albumName}</span> <span>{props.artistName}</span></p>
				<button onClick={handleButton}>-</button>
			</div>   
        </>
    )
}

export default Playlist;