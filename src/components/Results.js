import React from 'react';
import styles from '../css_modules/Results.module.css';

function Results(props) {

	const handleButton = () => {
		props.handlePlusButton();
	}

	return (
		<>
			<div id={props.id}>
				<h3>{props.song}</h3>
				<p><span className={styles.leftSpan}>{props.album}</span> <span>{props.artist}</span></p>
				<button onClick={handleButton}>+</button>
			</div>
		</>	
		)
}

export default Results;