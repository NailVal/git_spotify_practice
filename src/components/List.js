import React from 'react';

function List(props) {
	

	function handleButton() {

		const songsArrList = props.songsUri.flat();
			
		const obj = {
			playlistSpecialId: props.playlistId,
			songsUri: songsArrList
		}
		props.handleSaveButton(obj);
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