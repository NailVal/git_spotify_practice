import React from 'react';
import styles from '../css_modules/SearchBar.module.css';
import appStyles from '../css_modules/App.module.css';

function SearchBar(props) {

	const handleInputChange = (e) => {
		props.onSearchBarChange(e.target.value);
	}

	const handleButtonSubmit = (e) => {
		e.preventDefault();		 
		props.handleSubmit(true);
	}

	return (
		<>
			<form className={styles.form}>
				<input type="text" onChange={handleInputChange} value={props.value} placeholder="Type in a song" />
				<button type="submit" onClick={handleButtonSubmit}>Search</button>
				<small className={styles.small}>{props.handleError}</small>
			</form>
		</>
		);
}

export default SearchBar;