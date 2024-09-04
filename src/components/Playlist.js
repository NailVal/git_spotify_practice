import React from 'react';
import styles from '../css_modules/Results.module.css';

function Playlist(props) {

	
	const handleButton = () => {
		props.handleMinusButton(props.id);
	}

	const handleList = ({getArrayList}) => {
		props.addToLists(getArrayList);
	}
	
    return (
        <>
           	<div id={props.id}>
				<h3>{props.songName}</h3>
				<p><span className={styles.leftSpan}>{props.albumName}</span> <span>{props.artistName}</span></p>
				<button onClick={handleButton}>-</button>
			</div>
			{props.getArrayList.length > 1 ? <button type="submit" onClick={handleList}>Add to Playlist</button> : null}   
        </>
    )
}

export default Playlist;