import React from 'react';
import styles from '../css_modules/Results.module.css';

function Results(props) {

	const object = {
		index: props.index,
		songName: props.song,
		albumName: props.album,
		artistName: props.artist,
		specialId: props.specialId
	};

	const handleButton = () => {
		props.handlePlusButton(object);

	}

	return (
		<>
			<div id={props.specialId}>
				<h3>{props.song}</h3>
				<p><span className={styles.leftSpan}>{props.album}</span> <span>{props.art}</span></p>
				<button onClick={handleButton}>+</button>
			</div>
		</>	
		)
}

export default Results;