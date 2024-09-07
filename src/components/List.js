import React from 'react';

function List(props) {


	return (
		<>
			<h2>{props.playlistName}</h2>			
			{props.songsInfo.map((song, index) => (
				<div key={index}>
					<h3>{song.songName}</h3>
					<p>{song.albumName}</p>
				</div>
			))}
		</>	
	)
}

export default List;