import React from 'react';

function SearchBar(props) {

	const handleInputChange = (e) => {

		props.onSearchBarChange(e.target.value);
	}

	const handleButtonSubmit = (e) => {
		e.preventDefault();

		props.isActive(true);
	}

	return (
		<>
			<form>
				<input type="text" onChange={handleInputChange} value={props.value} />
				<button type="submit" onClick={handleButtonSubmit}>Search</button>
			</form>
		</>
		);
}

export default SearchBar;