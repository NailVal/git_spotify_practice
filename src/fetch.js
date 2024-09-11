import querystring from "querystring";

const clientId = "941433360379494185dbfadafd0a9781";
const clientSecret = "b07bddc3d41c47afa844b641dafdc9ba";

const redirect_uri = "http://localhost:3000";
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";

function authenticate() {
	let url = AUTHORIZE;
	url += "?client_id=" + clientId;
	url += "&response_type=code";
	url += "&redirect_uri=" + encodeURI(redirect_uri);
	url += "&scope=user-read-private user-read-email playlist-modify-public";

	window.location.href = url;

	const info = window.location.search;
	const params = new URLSearchParams(info);
	const myCode = params.get("code");

	return myCode;
}


 async function furtherAuthenticate() {

	const body = querystring.stringify({
		code: authenticate(),
		grant_type: 'authorization_code',
		redirect_uri: encodeURI(redirect_uri),
		client_id: clientId,
		client_secret: clientSecret
	})

	const response = await fetch(TOKEN, {
		method: 'POST',
		body,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret)
		}
	})
	const jsonResponse = await response.json();

	return jsonResponse;
}

export async function get(endpoint) {

		const jsonResponse = await furtherAuthenticate();
		const accessToken = jsonResponse.access_token;
		console.log(jsonResponse);

		const url = "https://api.spotify.com/v1/search?";
	    const searchQuery = `${url}q=${endpoint}&type=track&limit=10`;

		const data = await fetch(searchQuery, {
			headers: {
				"Authorization": `Bearer ${accessToken}`
			}
		});

		const tracksData = await data.json();

		return tracksData;				
}

export async function createPlaylist(userId, name) {

	const accessToken = await furtherAuthenticate();

	const url = `https://api.spotify.com/v1/users/${userId}/playlists`; 

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		},
		data: {
		//	name: JSON.stringify({name: name, public: true})
			name: name,
			public: true						
		}
	})

	const data = await response.json();

	return data;
}




/*
		const response = await fetch(TOKEN, {
			method: "POST",
			body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			} 		
		 });

		const jsonResponse = await response.json();
		const accessToken = jsonResponse.access_token;
*/