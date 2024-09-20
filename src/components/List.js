import React from 'react';

function List(props) {

	const handleButton = () => {
		props.handleListButton(props.playlistName);
	}

	return (
		<>
			<h2>{props.playlistName}</h2>			
			{props.songsInfo?.map((song, index) => (
				<div key={index}>
					<h3>{song.songName}</h3>
					<p>{song.artistName}</p>
				</div>
			))}
			<button type="submit" onClick={handleButton}>Save to Playlist</button>
		</>	
	)
}

export default List;